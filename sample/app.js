var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , GoogleStrategy = require('passport-google').Strategy;

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , dbroutes = require('./routes/dbroutes');

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:4000/auth/google/return',
    realm: 'http://localhost:4000/'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/login', function(res, req){
  if(req.user) {
    console.log('Logined, user is ' + req.user);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Success logined.... User: ' + req.user);
  } else {
    console.log('Still not login....');
    req.redirect('/auth/google');
  }
});

app.get('/auth/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/auth/google/return',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/account');
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.end('Get user information:' + JSON.stringify(req.user));
});

app.get('/products', dbroutes.getProducts);
app.get('/products/:id', dbroutes.getProductById);
app.del('/products/:id', dbroutes.delProductById);
app.post('/products', dbroutes.createProduct);
app.put('/products', dbroutes.updateProductAmountById);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

