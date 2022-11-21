//the very root of your application
// to use this router you need to hook up this router
const express = require('express');
const router = express.Router();
const Book = require('../models/book')

router.get('/',  async (req, res) => {
    let books;
    try{
      //limited the amount of books to be appear on the index page in desecding order 
      //exec() helper function
      books = await Book.find().sort({createAt: 'desc'}).limit(10).exec()
    } catch{
       books = []
    }
    res.render('index', {books : books})
})

module.exports = router;