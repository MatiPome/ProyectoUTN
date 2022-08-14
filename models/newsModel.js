var pool = require('./db');

async function getNews() {
    var query = "select  * from news order by `id` asc";
    var rows = await pool.query(query);
    return rows;
}

async function deleteNewsById(id) {
    var query = "delete from news where id = ?";
    var rows = await pool.query(query, [id]);
    return rows;
}

async function insertNews(obj) {
    try {
        var query = "insert into news set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNewsById(id) {
    var query = "select * from news where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function editNewsById(obj, id) {
    try {
        var query = "update news set ? where id=?";
        var rows = await pool.query(query, [obj, id]);
        return rows[0];
    } catch (error) {
        throw error;
    }

}

module.exports = { getNews, deleteNewsById, insertNews, getNewsById, editNewsById }