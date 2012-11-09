var db_options = {
  host: '211.78.255.92',
  port: 3306,
  user: 'nko',
  password: 'nko2012',
  database: 'nko2012'
};

var mysql = new require('mysql')
  , db = null;
var conn = mysql.createConnection(db_options);
exports.db = conn;

/*
if(mysql.createClient) {
  db = mysql.createClient(db_options);
} else {
  db = new mysql.Client(db_options);
  db.connect(function(err) {
    if(err) {
      console.error('connect db ' + db.host + ' error: ' + err);
      process.exit();
    }
  });
}
exports.db = db;
*/
