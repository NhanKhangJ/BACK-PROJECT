const express = require('express');
const Author = require('../models/author'); // mongoose author schema 
const Book = require('../models/book');
const router = express.Router();
//All authors Route
router.get('/', async (req, res) => {
    //search option to find the author
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')// regular expression return an object with case insensitive
    }
   try{
    //Search in the database name Mybrary => Author collections => search for the author
     const authors = await Author.find(searchOptions)
     res.render('authors/index', {
        //pass the authors you found to the index page that you going to render
         authors: authors,
         //req query is the the input of user pass in to find the author, you going to pass to the index when the form is submited
         searchOptions: req.query 
        })
   } catch{
     res.redirect('/')
   }
})

// New Author/add Author
router.get('/new', async (req, res) =>{
    res.render('authors/new', { author: new Author()})
})
//Create Author Method
//Receive info from the post request in the new.ejs page and create a new user
router.post('/', async (req,res) =>{
    //create a new user from Author formula/schema
    const author = new Author({
        name: req.body.name
    })
try {
    //when the author is save to this variable and when we got access to the id we will use show author route to show this author
     const newAuthor = await author.save()
     res.redirect(`authors/${newAuthor.id}`)
} catch {
    res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
    })
}

})
//show authors
router.get('/:id', async (req,res)=>{
  //After the author is created the id will pass in to this route we will get it by using (req.params.id)
  try{
    //Find that author with the id you have 
    const author = await Author.findById(req.params.id)
    //Find the book that associate with the author 
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/show', {
        //render show ejs with the author you find and the book you found
        author: author,
        booksByAuthor: books
    })
  }catch{
    //some thing go wrong redirect to this page
    res.redirect('/')
  }
})
//update author
//You will come to this route when you press the edit button in the main index route of Author
router.get('/:id/edit', async (req,res)=>{
//render edit.ejs with author variable that we pass in
 try{
     const author = await Author.findById(req.params.id)
     res.render('authors/edit', {author: author})
 } catch{
     res.redirect('/authors')
 }
})
//update author
//When the form in edit.ejs is submited, this route will receive the req.param.id
router.put('/:id', async (req,res)=>{
  let author;//declare some thing outside off the catch to use it
try {
    author = await Author.findById(req.params.id)
    //re declare the author name and save it
    author.name = req.body.name
    await author.save()
    //redirect to the show author if author is created
     res.redirect(`/authors/${author.id}`)
} catch {
    if(author == null){
        res.redirect('/')
    } else{
        //render this page if the in put has notthing in it
        res.render('authors/edit', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
}
})
//Delete author got trigger when the delete in the deleteform of partials
router.delete('/:id', async (req,res) =>{
    let author;//declare some thing outside off the catch to use it
    try {
        //find that author and remove it
        author = await Author.findById(req.params.id)
        await author.remove()
         res.redirect(`/authors`)
    } catch {
        if(author == null){
            res.redirect('/')
        } else{
            res.redirect(`/authors/${author.id}`)
        }
    }
})

module.exports = router;