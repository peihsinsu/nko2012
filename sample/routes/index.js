
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req.body.test);
  res.render('index', { title: 'Express' });
};
