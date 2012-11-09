/*
 * GET home page.
 */
var mydb = require('../lib/mydb');

exports.getPosts = function(req, res){
  mydb.jobs.getPosts(function(err, data, meta){
  	res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
};

exports.getPostById = function(req, res){
	mydb.jobs.getPostById(req.params.id, function(err, data, meta){
		res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
}

exports.createPost = function(req, res){
	var vo = {};
	vo.refer_topic_id = req.body.refer_topic_id;
	vo.topic_title = req.body.topic_title;
	vo.post_body = req.body.post_body;
	vo.create_user = req.body.create_user;
	mydb.jobs.createPost(vo, function(err, data, meta){
		res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
}