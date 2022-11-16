const mongoose =require('mongoose');

//schema is actually a table
const authorSchema = new mongoose.Schema({
    //type and required is the most commom thing when you requirred the schema
   name:{
    type: String,
    required: true,
   }

})
//Model are fancy constructor compiled from Schema definitions An instance of a model is called a document.
//Models are responsible for creating and reading documents from the underlying MongoDB database.
module.exports = mongoose.model('Author', authorSchema)