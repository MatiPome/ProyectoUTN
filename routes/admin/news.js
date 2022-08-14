var express = require('express');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);

var router = express.Router();
var newsModel = require('./../../models/newsModel');


router.get('/', async function (req, res, next) {
    var news = await newsModel.getNews();
    res.render('admin/news', {
        layout: 'admin/layoutghost',
        user: req.session.name, news
    });
});

router.get('/delete/:id', async (req, res, next) => {
    var id = req.params.id;
    await newsModel.deleteNewsById(id);
    res.redirect('/admin/news')
});

router.get('/add', (req, res, next) => {
    res.render('admin/add', {
        layout: 'admin/layoutghost'
    });
});

router.post('/add', async (req, res, next) => {
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            image = req.files.image;
            img_id = (await uploader(image.tempFilePath)).public_id;
        }


        if (req.body.title != "" && req.body.subtitle != "" && req.body.modalBody != "") {
            await newsModel.insertNews({
                ...req.body, 
                img_id
            });
            res.redirect('/admin/news')
        } else {
            res.render('/admin/add', {
                layout: 'admin/layoutghost',
                error: true, message: 'Please fill everything'
            })
        }
    }
    catch (error) {
        console.log(error)
        res.render('/admin/add', {
            layout: 'admin/layoutghost',
            error: true, message: 'News were not loaded'
        });
    }
});

router.get('/edit/:id', async (res, req, next) => {

    var id = req.params.id;
    var news = await newsModel.getNewsById(id);
    res.render('admin/edit', {
        layout: 'admin/layoutghost',
        news
    });
});

router.post('/edit', async (req, res, next) => {
    try {
        let obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            modalBody: req.body.modalBody
        }

        await newsModel.editNewsById(obj, req.body.id);
        res.redirect('/admin/news');
    }
    catch (error) {
        console.log(error)
        res.render('/admin/edit', {
            layout: 'admin/layoutghost',
            error: true, message: 'No edit was made'
        })
    }
})

module.exports = router;