var pool = require('./db');
var md5 = require('md5');

async function getUserByUsernameAndPassword(user, password){
    try {
        var query = 'select * from users where name = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];

    } catch (error) {
       console.log(error);
    }
}

module.exports = { getUserByUsernameAndPassword };