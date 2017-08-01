var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = 100;
canvas.height = 100;

var users = [];


setInterval(function() {
	context.fillStyle = "#000000";
	//Create a black rectangle covering canvas
	context.fillRect(0, 0, canvas.width, canvas.height);

	for(var i in users) {
		draw(users[i]);
	}

}, 24);

function draw(user){
	context.fillStyle = user.color;
	context.fillRect(user.x, user.y, user.size, user.size);
}