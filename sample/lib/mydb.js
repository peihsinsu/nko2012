
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
  "getPostById":
    function(id, callback) {
      db.query('select * from tb_post where id = ?', [id], callback)
    },
  "getPosts":
    function(callback) {
      db.query('select * from tb_post ', callback);
    },
  "createPost":
    function(vo, callback){
      db.query(
       'insert into tb_post (refer_topic_id, topic_title, post_body, create_user, create_date) values (?,?,?,?,now())',
       [vo.refer_topic_id, vo.topic_title, vo.post_body, vo.create_user], callback);
    },
  "updatePostTitleById":
    function(id, title, callback){
      db.query(
        'update tb_post set topic_title = ? where id = ?',
        [title, id], callback);
    },
  "deletePostById":
    function(id, callback){
      db.query('delete from tb_post where id = ?', [id], callback);
    }
}

exports.jobs = script;
