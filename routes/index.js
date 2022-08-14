var express = require('express');
var router = express.Router();
var newsModel = require('../models/newsModel')

/* GET home page. */
router.get('/', async function (req, res, next) {

  var news = await newsModel.getNews();
  res.render('index', { 
    news 
  });
});

module.exports = router;
