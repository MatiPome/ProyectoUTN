var mysql = require('mysql');
var util = require('util');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: 3306
});

pool.query = util.promisify(pool.query);

module.exports = pool;






// MYSQL_HOST=localhost
// MYSQL_DB_NAME=users
// MYSQL_USER=root
// MYSQL_PASSWORD=