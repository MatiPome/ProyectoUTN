var express = require('express');
var router = express.Router();
var newsModel = require('../models/newsModel');
var cloudinary = require('cloudinary').v2;


/* GET home page. */
router.get('/', async function (req, res, next) {

  var news = await newsModel.getNews();

  news = news.splice(0, 5)
  news = news.map(news1 => {
    if (news1.img_id) {
      const image = cloudinary.url(news1.img_id, {
        width: 350,
        crop: 'fill'
      });
      return {
        ...news1,
        image
      };
    } else {
      return{
        ...news1,
        image: '/images/noimage.jpg'
      };
    };

  });

  res.render('index', {
    news
  });
});

module.exports = router;
