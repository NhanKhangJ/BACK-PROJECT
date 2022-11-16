if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express();
//require that package
const expressLayouts =require('express-ejs-layouts')

//bodyparser
const bodyPaser= require('body-parser')

//Require or index Routes the index routes
const indexRouter = require('./routes/index')

//Require the authors routes
const authorRouter = require('./routes/authors')


//setup view engine and views folder
app.set('view engine', 'ejs')
//setup where the view is coming from
app.set('views', __dirname + '/views' )
//tell our layout file where you want them to be, it going to be the mother file, so we don't have to duplicate begining html and the end html in our page
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
//tell our public file where your file going to be
app.use(express.static('public'))
app.use(bodyPaser.urlencoded({limit: '10mb', extended: false}))

//require mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'))

//tell the root path where is it comming from and the which router we going to handle it
app.use('/', indexRouter)
//tell athors path where is it comming from and the which router we going to handle it
app.use('/authors', authorRouter)


app.listen(process.env.PORT || 3000, () =>{
    console.log('listen on port ')
})