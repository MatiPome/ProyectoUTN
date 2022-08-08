var express = require('express');
var router = express.Router();
var usersModel = require('./../../models/usersModel')

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});

router.post('/', async (req, res, next) => {
    try {
        var name = req.body.name;
        var password = req.body.password;
        
        var data = await usersModel.getUserByUsernameAndPassword(name,password);

        if (data != undefined) {
            // req.session.id.name = data.id;
            // req.session.name = data.name;
            res.redirect('/admin/novedades');
        }
        else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
                
            });
        }

    }
    catch (error) {
        console.log(error);
    }
})


module.exports = router;
