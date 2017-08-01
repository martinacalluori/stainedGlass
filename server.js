var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var io = require('socket.io')(server);


// var app = require('express')();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// var WebSocketServer = require("ws").Server;
// io.on('connection', function(){ /* … */ });
// server.listen(3000);

//Set root
var app = express();
app.use(express.static(__dirname + "/"));

//Set port. Will be set to 5000 on local devicves and  determined by remote host
var port = process.env.PORT || 5000;

var server = http.createServer(app);
server.listen(port);

console.log("http server listen on %d", port);

var wss = new WebSocketServer({server: server});
console.log("WebSocket Server was created");

//socket.io
io.on('connection', function(){ /* … */ });

var connections = [];
var users = [];
var glass = [];

wss.on('connection', function(ws) {
	connections.push(ws);

	console.log('user connected');

	ws.on('message', function(m){

		var msg = JSON.parse(m);
		console.log(msg);

		if(msg.type == 'register'){
			users.push(msg.user);
			console.log(users);
		} else if (msg.type == 'loadAll') {
			msg.users = users;
		}

		if(msg.sendToAll){
			//Send to all connections

			users.forEach(function(user, index){
				if(user.id == msg.id && user != msg.user) {
					user[index] = msg.user;
				}
			});

			connections.forEach(function(connection, index){
				connection.send(JSON.stringify(msg));
				console.log("msg sent to client");
        	});

		} else {
			//Send back to sender
			ws.send(JSON.stringify(msg));
		}

	});


ws.on('close', function() {

	

	// var time = new Date().toJSON();

    var msg = {
        type: 'logoff',
       	user: users[connections.indexOf(ws)]

    }

    //Search the connections array for the current socket that is closing.
    //Use that index to find the user in the users array. 
    //This index should be the same because they are both added in the same order.

    // users.splice(connections.indexOf(ws), 1);
    connections.splice(connections.indexOf(ws), 1);

	connections.forEach(function(connection, index){
				connection.send(JSON.stringify(msg));
				console.log("msg sent to client");
			});

	console.log("user disconnected");
})
});

console.log("websocket server is up");
