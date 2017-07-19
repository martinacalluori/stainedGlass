var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");

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


var connections = [];
var users = [];
var glass = [];

wss.on('connection', function(ws) {
	connections.push(ws);

	console.log('user connected');

	// socket to the card table
	var tableSocket;

	realtimeListener.on('connection', function (socket) {
  
    // receives a connect message from the card table
    socket.on("table-connect", function () {
        // ...  and stores the card table socket
        tableSocket = socket;
    });

    // receives a throw card message from a phone
    socket.on('phone-throw-card', function (cardData) {
        if (tableSocket) {
            // ... and forwards the data to the card table
            tableSocket.emit('phone-throw-card', cardData);
        }
    });
});

	// ws.on('message', function(m){

	// 	var msg = JSON.parse(m);
	// 	console.log(msg);

	// 	if(msg.type == 'register'){
	// 		users.push(msg.user);
	// 		console.log(users);
	// 	} else if (msg.type == 'loadAll') {
	// 		msg.users = users;
	// 	}

	// 	if(msg.sendToAll){
	// 		//Send to all connections

	// 		users.forEach(function(user, index){
	// 			if(user.id == msg.id && user != msg.user) {
	// 				user[index] = msg.user;
	// 			}
	// 		});

	// 		connections.forEach(function(connection, index){
	// 			connection.send(JSON.stringify(msg));
	// 			console.log("msg sent to client");
 //        	});

	// 	} else {
	// 		//Send back to sender
	// 		ws.send(JSON.stringify(msg));
	// 	}

	// });


// ws.on('close', function() {

	

// 	// var time = new Date().toJSON();

//     var msg = {
//         type: 'logoff',
//        	user: users[connections.indexOf(ws)]

//     }

//     //Search the connections array for the current socket that is closing.
//     //Use that index to find the user in the users array. 
//     //This index should be the same because they are both added in the same order.

//     users.splice(connections.indexOf(ws), 1);
//     connections.splice(connections.indexOf(ws), 1);


// 	connections.forEach(function(connection, index){
// 				connection.send(JSON.stringify(msg));
// 				console.log("msg sent to client");
// 			});

// 	console.log("user disconnected");
// })
});

console.log("websocket server is up");