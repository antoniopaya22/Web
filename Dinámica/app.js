var express = require('express');
var jade = require('jade');

var app = express();

app.set("view engine","jade");
app.use(express.static("public"));
app.get("/",function(solicitud,respuesta){
	// "/" significa que acepta las url que sean del tipo localhost:8080/ o sin barra, no /app por ej
	// get es un metodo de HTTP como post o get. Post=formularios
	//respuesta.send("Hola Mundo");
	respuesta.render("index");
});

app.listen(8080);