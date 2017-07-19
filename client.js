window.onload = function() {

	var host = location.origin.replace(/^http/, 'ws');
	var ws = new WebSocket(host);
  var socket = null;
    
    // var id;

    var user = new User();
    $('.id').html(user.id);


    addGlass.swipe() {
     function throwGlass(cardData) {
  socket.emit('phone-throw-card', glassData);
}
    }

  //   var glass = {
  //      shape: 'square',
  //      color: 'red',
  //      }
  //   var msg = {
  //      type: 'addGlass',
  //      sendToAll: true,
  //      glass: glass
  //   }

    console.log('works 4 me');
    }

    
	ws.onopen = function() {

    console.log(user);

        var glass = {
       shape: 'square',
       color: 'red',
       }

    ws.send(JSON.stringify(msg));


      var msg = {
        'type': 'register',
        'sendToAll': true,
        'user': user
      }

      ws.send(JSON.stringify(msg));

	}

	ws.onmessage = function(e){

      var data = JSON.parse(e.data);
      console.log(data);

      user[data.type](data);


      // if(data.type == 'register'){
      //   user.register();
      // }

	}

   $(document).swipe(function(){
        console.log('swipe');
       
        user.color = user.generateColor();

        var msg = {
           type: 'addGlass',
           sendToAll: true,
           glass: glass
        }
       
       ws.send(JSON.stringify(msg));
         });  
}

