const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+ "/public"));


app.get("/",function(req,res){
    res.sendFile("index.html");
});
const users = [];

io.on("connection", function(socket){
    console.log("utilisateur connecté"); 
    socket.on("dessin",function(data){
        socket.broadcast.emit("dessin",data);
    });
    socket.on("new user",function(name){
        users[socket.id] = name;
        socket.broadcast.emit("new user",name);
    });
    socket.on("new message",function(message){
        io.emit("new message",{author:users[socket.id],message});
    });
});

http.listen(3000,function(){
    console.log("Le serveur marche !");
});