var mysql = require('mysql');

  module.exports = function initDB(cb) {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "boomershub"
      });

      con.connect(function(err) {
        if (err){
            throw err;
        } else{
            console.log("Connected!");
            cb(con);
        }
      })

}