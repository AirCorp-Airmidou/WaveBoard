$(function(){
    const socket = io.connect();
    
    $("#form").submit(function(e){
       e.preventDefault();
        socket.emit("new user",$("#newTxtUser").val());
        $("#newTxtUser").val('');
    });
    socket.on("new user",function(name){
       $("#chatB").append($("<p>").text(name + " is connected!")); 
    });
    
     $("#form2").submit(function(e){
       e.preventDefault();
        socket.emit("new message",$("#txtChatMsg").val());
        $("#txtChatMsg").val('');
    });
    socket.on("new message",function(data){
       $("#chatB").append($("<p>").html('<h1>'+ data.author + "</h1>"+ ' '+ data.message)); 
    });
});