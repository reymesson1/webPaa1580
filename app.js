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
var uploadsFolder = __dirname + '/static/images/';  // defining real upload path
// var uploadsFolder = __dirname + '/static/executed/';  // defining real upload path
// var uploadsFolder = __dirname + '/uploads/';  // defining real upload path
var upload = multer({ dest: uploadsFolder }); // setting path for multer

var masterController = require('./controller/masterController');

var productController = require('./controller/productController');

var styleController = require('./controller/styleController');

var companyController = require('./controller/companyController');

var userController = require('./controller/userController');

var categoryController = require('./controller/categoryController');

var languageController = require('./controller/languageController');

app.get('/restaurants', masterController.getMaster);

app.get('/product', productController.getMaster);

app.get('/report', productController.getReport);

app.get('/posts', productController.getMasterIpad);

app.post('/postsfilter', productController.setMasterIpadFilter);

app.post('/createpost', productController.setMasterIpad);

app.post('/createproduct2', productController.setMaster);

app.post('/createproduct3', productController.setMasterOutput);

app.post('/editproduct', productController.editProduct);

app.post('/editdeletepicture', productController.editDeletePicture);

app.post('/defaultimage', productController.editPictureProduct);

app.post('/deleteproduct', productController.deleteProduct);

app.post('/createproduct', upload.array('single-file'), function(request, response) {

  response.setHeader("Content-Type", "text/html");

  var description = request.body.description;
  var style = request.body.style;

  var fileName = request.files[0].originalname; // original file name
  var file = request.files[0].path; // real file path with temporary name

  var errorcode = 0;
  for (var i = 0; i < request.files.length; i++) {

      fs.rename(request.files[i].path, uploadsFolder + description +'-'+style+'-'+i+'.jpg', function (err) {  //working fine
        errorcode=err
      });
  }

  if (errorcode) {
    console.log(err);
    response.json({success:false, message: err});
    return;
  }

  response.json({success:true, message: 'File uploaded successfully', fileName: fileName});

});

app.post('/createproduct5', upload.array('single-file'), function(request, response) {

  response.setHeader("Content-Type", "text/html");

  var description = request.body.description;
  var style = "test";

  console.log(description);

  var fileName = request.files[0].originalname; // original file name
  var file = request.files[0].path; // real file path with temporary name

  var errorcode = 0;
  for (var i = 0; i < request.files.length; i++) {

      // fs.rename(request.files[i].path, uploadsFolder + description +'-'+style+'-'+i+'.jpg', function (err) {  //working fine
      fs.rename(request.files[i].path, uploadsFolder + description +'-'+style+'-'+i+'.jpg', function (err) {  //working fine
        errorcode=err
      });
  }

  if (errorcode) {
    console.log(err);
    response.json({success:false, message: err});
    return;
  }

  response.json({success:true, message: 'File uploaded successfully', fileName: fileName});

});

app.post('/editpictureproduct', upload.array('single-file'), function(request, response) {

  response.setHeader("Content-Type", "text/html");

  var description = request.body.description;
  var style = request.body.style;
  var newImage = request.body.newimage;

  var fileName = request.files[0].originalname; // original file name
  var file = request.files[0].path; // real file path with temporary name

  var errorcode = 0;
  for (var i = 0; i < request.files.length; i++) {

      // fs.rename(request.files[i].path, uploadsFolder + description +'-'+style+'-'+i+'.jpg', function (err) {  //working fine
      fs.rename(request.files[i].path, uploadsFolder + newImage, function (err) {  //working fine
        errorcode=err
      });
  }

  if (errorcode) {
    console.log(err);
    response.json({success:false, message: err});
    return;
  }

  response.json({success:true, message: 'File uploaded successfully', fileName: fileName});

});


app.get('/style', styleController.getStyle);

app.post('/createstyle', styleController.setStyle);

app.post('/deletestyle', styleController.deleteStyle);

app.get('/postsstyles', styleController.getStyleIpad);

app.get('/companies', companyController.getCompany);

app.get('/postscompanies', companyController.getCompanyIpad);

app.post('/createcompany', companyController.setCompany);

app.post('/deletecompany', companyController.deleteCompany);

app.get('/gethiddenmode', productController.getHidden);

app.post('/onhiddenmode', productController.setHidden);

app.post('/filterapiui', productController.setFilterAPIUI);

app.post('/sendemail', productController.sendEmail);

app.post('/setfavorite', productController.setFavorite);

app.get('/users', userController.getUsers);

app.post('/createuser', userController.createUser);

app.post('/removeuser', userController.deleteUser);

app.post('/login', userController.setLogin);

app.post('/reset', userController.setResetPassword);

app.post('/register', userController.setRegister);

app.post('/loginipad', userController.setLoginIpad);

app.get('/categories', categoryController.getCategory);

app.post('/createcategory', categoryController.setCategory);

app.post('/removecategory', categoryController.removeCategory);

app.get('/languages', languageController.getLanguage);

app.post('/createlanguage', languageController.setLanguage);

mongoose.connect('mongodb://localhost:27017/holafly',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8085, function(){
    console.log("Listening from 8085...");
});