const mongoose =require('mongoose');
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'

//schema is actually a table
const bookSchema = new mongoose.Schema({
    //type and required is the most commom thing when you requirred the schema
   title:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: true
   },
   publishDate:{
    type: Date,
    required: true
   },
   pageCount:{
    type: Number,
    required: true
   },
   createdAt: {
    type: Date,
    required: true,
    default: Date.now
   },
   coverImageName:{
     type: String,
     required: true
   },
   author:{
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'Author'
   }

})


//Model are fancy constructor compiled from Schema definitions An instance of a model is called a document.
//Models are responsible for creating and reading documents from the underlying MongoDB database.

bookSchema.virtual('coverImagePath').get(function() {
  if (this.coverImageName != null) {
    return path.join('/', coverImageBasePath, this.coverImageName)
  }
})
module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath;