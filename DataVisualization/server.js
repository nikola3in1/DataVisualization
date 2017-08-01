//Express
var express = require('express');
var app = express();
var server = app.listen(3000,function(){ console.log("listening...");})
app.use(express.static('public'));

app.get('/map',function(req,res){
	res.sendFile(__dirname + '/public/map.html');
})

app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/index.html');
})