const mongoose =require('mongoose');
const book = require('./book');
const Book = require('./book')

//schema is actually a table
const authorSchema = new mongoose.Schema({
    //type and required is the most commom thing when you requirred the schema
   name:{
    type: String,
    required: true,
   }

})

authorSchema.pre('remove', function(next){
    Book.find({ author: this.id}, (err, books)=>{
        if(err){
            next(err)
        } else if (books.length > 0){
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})


//Model are fancy constructor compiled from Schema definitions An instance of a model is called a document.
//Models are responsible for creating and reading documents from the underlying MongoDB database.
module.exports = mongoose.model('Author', authorSchema)