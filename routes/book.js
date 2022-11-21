const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'] //define the type of image

//All Books Route

// When using the form of index.ejs is submitted this route will be trigger
router.get('/', async (req, res) => {
  let query = Book.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  }
  //re asign the value of date in books because they use to be string
  try {
    //after the query is completed this will render the index.ejs again if it match the query
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Books Route
//render a new.ejs page with the function renderNewPage 
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book())
})


//Create Book route
//This is where we creating a new books
router.post('/', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description
  })
  saveCover(book, req.body.cover)

  try {
    const newBook = await book.save()
    res.redirect(`books/${newBook.id}`)

  } catch {
    renderNewPage(res, book, true)
  }
})

//Show book route 
//After creating a book, this will be trigger or user click view on the page
router.get('/:id', async (req, res) => {
  try { //populate the author variable 
    const book = await Book.findById(req.params.id)
      .populate('author')// the author in this object will show up
      .exec();
    res.render('books/show', {
      book: book //when author is show up we can use it in show.ejs
    })
  } catch {
    res.redirect('/')
  }
})

//Edit Book Route
//this will trigger when we hit the edit button of the books
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    renderEditPage(res, book)
  } catch {
    res.render('/')
  }
})

//Update Book route
//This is the method we use to update the books
router.put('/:id', async (req, res) => {
  let book
  try {
    book = await Book.findById(req.params.id)
    book.title = req.body.title
    book.author = req.body.author
    book.publishDate = new Date(req.body.publishDate)
    book.pageCount = req.body.pageCount
    book.description = req.body.description
    if (req.body.cover != null && req.body.cover !== '') {
      saveCover(book, req.body.cover)
    }
    await book.save()
    res.redirect(`/books/${book.id}`)
  } catch {
    if (book != null) {
      renderEditPage(res, book, true)
    } else {
      redirect('/')
    }
  }
})
//delete Book Page
//Delete the book with the request delete
router.delete('/:id', async (req, res) =>{
  let book 
  try{
    book = await Book.findById(req.params.id)
    await book.remove()
    res.redirect('/books')
  }catch{
    if (book != null) {
      res.render('books/show',{
        book: book,
        errorMessage: 'Could not remove book'
      })
    } else {
      res.redirect('/')
    }
  }
})


async function renderNewPage(res, book, hasError = false) {
  renderFormPage(res, book, 'new', hasError)
}

async function renderEditPage(res, book, hasError = false) {
  renderFormPage(res, book, 'edit', hasError)
}
//represent for both  renderNewPage functin and renderEditPage function
async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError){
     if (form === 'edit'){
      params.errorMessage = 'Error Updated Book'
     } else {
      params.errorMessage = 'Error Creating Book'
     }
    }
    res.render(`books/${form}`, params)
  } catch {
    res.redirect('/books')
  }
}

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64')
    book.coverImageType = cover.type
  }
}

module.exports = router;