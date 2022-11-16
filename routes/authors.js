const express = require('express');
const author = require('../models/author');
const Author = require('../models/author'); // mongoose author schema 
const router = express.Router();
//All authors Route
router.get('/', async (req, res) => {
    console.log(req.query.name)
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
   try{
     const authors = await Author.find(searchOptions)
     res.render('authors/index', {
         authors: authors,
         searchOptions: req.query
        })
   } catch{
     res.redirect('/')
   }
})

// New Author Route
router.get('/new', (req, res) =>{
    res.render('authors/new', { author: new Author()})
})
//Create Author route
router.post('/', async (req,res) =>{
    const author = new Author({
        name: req.body.name
    })
try {
     const newAuthor = await author.save()
     res.redirect(`authors`)
} catch {
    res.render('author/new', {
        author: author,
        errorMessage: 'Error creating Author'
    })
}

})

module.exports = router;