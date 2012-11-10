var util = require('util')
  , cradle = require('cradle')
  , dbusername = 'admin'
  , dbpassword = 'nko2012'
  , databasename = 'nko2012'
  , db_address = '211.78.245.115'
  , db_port = 5984
  , db = new(cradle.Connection)('http://' + db_address, db_port, {
    auth: { username: dbusername, password: dbpassword },
    cache: false,
    raw: false
  }).database(databasename);

//Sample data
var id = 'simon';
var doc = {phone:"1234", mail:"simonsu.mail@gmail.com"};
var doc2 = {phone:"2234", mail:"simonsu@mitac.com.tw"};
var rev = '2-d22467d07b631c884c3a702def244016';

var script = {
        "C": //Create Record
        function() {
                db.save(id, doc, function(err, res){
                        if(err) console.log('[ERROR]%s',JSON.stringify(err));
                        console.log('Got response....' + res);
                });
        },
        "R": //Read Record
        function() {
                console.log('Query of %s', id);
                db.get( id, function (err, doc) {
                        if(err) console.log('[ERROR]%s',JSON.stringify(err));
                        console.log('Got document....' + doc);
                });
        },
        "View": //Read View ... need to create view first
        function() {
                console.log('Query of %s', id);
                db.view( 'domain/userDomain',{key: userid}, function (err, doc) {
                        if(err) console.log('[ERROR]%s',JSON.stringify(err));
                        console.log('Got documents from view...' + doc);
                });
        },
        "U": //Update Record
        function() {
                db.merge(id, doc2, function (err, res) {
                        if(err) console.log('[ERROR]%s',JSON.stringify(err));
                        console.log('Got response....' + res);
                });
        },
        "D": //Delete Record
        function() {
                var rev = process.argv[3];
                db.remove(id, rev, function(err, res){
                        if(err) console.log('[ERROR]%s',JSON.stringify(err));
                        console.log('Got response....' + res);
                })
        }
}

script[process.argv[2]]();
