var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.mySQL_HOST,
    user: process.env.mySQL_USER,
    password: process.env.mySQL_PASSWORD,
    database: process.env.mySQL_DB_NAME
});

pool.query = util.promisify(pool.query);

module.exports = pool;






// MYSQL_HOST=localhost
// MYSQL_DB_NAME=users
// MYSQL_USER=root
// MYSQL_PASSWORD=