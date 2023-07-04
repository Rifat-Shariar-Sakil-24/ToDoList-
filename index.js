var con = require('./connection');
// var express = require('express');
// var app = express();

// var bodyParser = require('body-parser');

// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended:true}));

// app.get('/', function(req, res){

//     res.sendFile(__dirname+'/register.html');

// });

// app.post('/', function(req,res){
//  var name = req.body.name;
 con.connect(function(error){
   if(error) throw error;
   //var sql = "INSERT INTO notes(name) VALUES('"+name+"')";
   //con.query(sql,function(error, result){

   // if(error) throw error;
   // res.send('Text inserted'+result.insertID);
   con.query("select * from doctor", function(error, result){
    if(error) throw error;
    console.log(result);
   })
   console.log(44);
   
 
});




