const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


io.on("connection", client =>{
 
      client.on("event", data => {
        console.log( data);
      client.emit("from server", data);
        
      });
      
      client.on("disconnect", ()=>{
        console.log("socket disconnect");
        
      })
  })

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
const port = process.env.PORT;
server.listen(port, ()=> console.log("Server is listening on port: " + port));
