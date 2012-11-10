/*
 * GET home page.
 */
var mydb = require('../lib/mydb');

exports.getProducts = function(req, res){
  mydb.jobs.getProducts(function(err, data, meta){
  	res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
};

exports.getProductById = function(req, res){
	mydb.jobs.getProductById(req.params.id, function(err, data, meta){
		res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
}

exports.delProductById = function(req, res){
	mydb.jobs.delProductById(req.params.id, function(err, data, meta){
		res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
  });
}

exports.createProduct = function(req, res){
	var vo = {};

	vo.product_name = req.body.product_name;
	vo.product_descript = req.body.product_descript;
	vo.amount = req.body.amount;
	vo.update_user = req.body.update_user;
	mydb.jobs.createProduct(vo, function(err, data, meta){
		//res.writeHead(200, {'Content-Type': 'application/json'});
    //res.end(JSON.stringify(data));
    res.redirect('/productList.html');
  });
}

exports.updateProductAmountById = function(req, res){
	var vo = {};
	vo.amount = req.body.amount;
	vo.id = req.body.id;
	mydb.jobs.updateProductAmountById(vo, function(err, data, meta){
		res.writeHead(200, {'Content-Type': 'application/json'});
		console.log('Update done...' + JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
}