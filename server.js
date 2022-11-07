if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express();
//require that package
const expressLayouts =require('express-ejs-layouts')

const indexRouter = require('./routes/index')

//setup view engine and views folder
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views' )
app.set('layout', 'layouts/layout')
app.use(expressLayouts);
app.use(express.static('public'))

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.on('open', error => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000, () =>{
    console.log('listen on port ')
})