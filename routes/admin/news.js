var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/news',{
        layout: 'admin/layoutghost',
        user: req.session.name
    });
});

module.exports = router;