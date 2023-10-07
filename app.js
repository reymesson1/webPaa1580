var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
var fs = require('fs');
var cors = require('cors')
app.use(cors())
app.options('*', cors())
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
var mongoose = require('mongoose');
var multer  = require('multer');
// import '@shopify/shopify-api/adapters/node';
var shopifyApi = require('@shopify/shopify-api');
var LATEST_API_VERSION = require('@shopify/shopify-api');
const { count } = require('console');
var uploadsFolder = __dirname + '/static/images/';  // defining real upload path
// var uploadsFolder = __dirname + '/static/executed/';  // defining real upload path
// var uploadsFolder = __dirname + '/uploads/';  // defining real upload path
var upload = multer({ dest: uploadsFolder }); // setting path for multer

app.get('/newpost', async(res,req) => {

    const countData = await shopifyApi.api.rest.Product.count({
        session: res.locals.shopify.session
    })

    console.log(countData);

    res.send(countData);

})

app.get('/posts', function(){

    console.log("post");

    const countData = await

    res.send({"name":"test"});
});

app.post('/postsfilter', function(req,res){

    console.log("post");
});

mongoose.connect('mongodb://localhost:27017/amsel',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8085, function(){
    console.log("Listening from 8085...");
});