
var db_options = {
  host: '211.78.255.92',
  port: 3306,
  user: 'nko',
  password: 'nko2012',
  database: 'nko2012'
};

var mysql = new require('mysql')
  , db = mysql.createConnection(db_options);

var script = {
  "getProductById":
    function(id, callback) {
      console.log('List products by id...' + id);
      db.query('select * from tb_product where id = ?', [id], callback)
    },
  "getProducts":
    function(callback) {
      console.log('List all products...');
      db.query('select * from tb_product ', callback);
    },
  "createProduct":
    function(vo, callback){
      console.log('Will create product:' + JSON.stringify(vo));
      db.query(
       'insert into tb_product (product_name, product_descript, amount, update_date, update_user) values (?,?,?,?,now())',
       [vo.product_name, vo.product_descript, vo.amount, vo.update_date, vo.update_user], callback);
    },
  "updateProductAmountById":
    function(vo, callback){
      console.log('Will update %s amount to %s', vo.id, vo.amount);
      db.query(
        'update tb_product set amount = ? where id = ?',
        [vo.amount, vo.id], callback);
    },
  "delProductById":
    function(id, callback){
      console.log('Will delete product:%s', id);
      db.query('delete from tb_product where id = ?', [id], callback);
    }
}

exports.jobs = script;
