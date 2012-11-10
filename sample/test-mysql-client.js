/**
 * Usage: node test-mysql-client.js [create|query|delete|update]
 *
 */
var config = require('./test-mysql-config')
  , db = config.db;

var script = {
  "R":
    function() {
      db.query('select * from tb_post where id = ?', [1], function(err, rows, fiels) {
        if(err) console.log('[ERROR]'+JSON.stringify(err));
        console.log(JSON.stringify(rows));
        //console.log(fiels);
      })
    },
  "ALL":
    function() {
      db.query('select * from tb_post ', function(err, rows, fiels) {
        if(err) console.log('[ERROR]'+JSON.stringify(err));
        console.log(JSON.stringify(rows));
        //console.log(fiels);
      })
    },
  "C":
    function(){
      db.query(
       'insert into tb_post (refer_topic_id, topic_title, post_body, create_user, create_date) values (?,?,?,?,?)', //SQL command
       ['test id', 'test title', 'test post body', 'simon', new Date()], //Conditions
       function(err, rows, fiels) { //callback
         if(err) return console.log(JSON.stringify(err));
         console.log(rows);
       })
    },
  "U":
    function(){
      db.query(
        'update tb_post set topic_title = ? where id = ?',
        ['test update',1],
        function(err, rows, fiels) {
          if(err) return console.log(JSON.stringify(err));
            console.log(rows);
        });
    },
  "D":
    function(){
      db.query('delete from tb_post where id = ?', [2], function(err, rows, fiels) {
        if(err) return console.log(JSON.stringify(err));
        console.log(rows);
      });
    }
}

script[process.argv[2]]()
db.end()
