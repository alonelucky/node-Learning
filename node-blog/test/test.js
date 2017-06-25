var mysql = require('mysql');
var dbConfig = {
    host:'127.0.0.1',
    user:'',
    password:'',
    database:''
}

var connection = mysql.createConnect(dbConfig);

module.exports=connection.connect();





var db = require('./mysql.js');

///
db.query();