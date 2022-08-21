var express = require('express');
var router = express.Router();
var newsModel = require('./../../models/newsModel');

var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



router.get('/', async function (req, res, next) {

    // var news = await newsModel.getNews();

    var news
    if (req.query.q === undefined){
        news = await newsModel.getNews();
    } else {
        news = await newsModel.searchNews(req.query.q);
    }

    news = news.map(news1 => {
        if (news1.img_id) {
            const image = cloudinary.image(news1.img_id, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...news1,
                image
            }
        } else {
            return {
                ...news1,
                image: ''
            }
        }
    });

    res.render('admin/news', {
        layout: 'admin/layoutghost',
        user: req.session.name,
        news,
        is_search: req.query.q !==undefined,
        q: req.query.q
    });
});

router.get('/delete/:id', async (req, res, next) => {
    var id = req.params.id;

    let news1 = await newsModel.getNewsById(id);
    if (news1.img_id) {
        await (destroy(news1.img_id));
    }

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
            console.log('check');
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

router.get('/edit/:id', async (req, res, next) => {

    var id = req.params.id;
    var news = await newsModel.getNewsById(id);
    res.render('admin/edit', {
        layout: 'admin/layoutghost',
        news
    });
});

router.post('/edit', async (req, res, next) => {
    try {
        let img_id = req.body.img_original;
        let delete_img_old = false;
        

        if (req.body.img_delete === "1") {
            img_id = null;
            delete_img_old = true;
            console.log('check1');
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                image = req.files.image;
                img_id = (await uploader(image.tempFilePath)).public_id;
                delete_img_old = true;
                console.log('check2');
            }
        }
        if (delete_img_old && req.body.img_original) {
            await (destroy(req.body.img_original));
            console.log('check3');
        }

        var obj = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            modalBody: req.body.modalBody,
            img_id
        }

        await newsModel.editNewsById(obj, req.body.id);
        res.redirect('/admin/news');
    }
    catch (error) {
        console.log(error)
        res.render('admin/edit', {
            layout: 'admin/layoutghost',
            error: true, message: 'No edit was made'
        })
    }
})






module.exports = router;