var express = require('express');
var app = express();

app.get("/",function(req,res){

	res.end("Hola Mundo");

});

app.listen(8080);