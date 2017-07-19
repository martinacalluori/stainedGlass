window.onload = function() {

	var host = location.origin.replace(/^http/, 'ws');
	var ws = new WebSocket(host);
    
    // var id;

    var user = new User();
    $('.id').html(user.id);


    addGlass.swipe() {
     
    }

    var glass = {
       shape: 'square',
       color: 'red',
       }
    var msg = {
       type: 'addGlass',
       sendToAll: true,
       glass: glass
    }

     console.log('works 4 me');
    }

    
	ws.onopen = function() {

    console.log(user);

    var msg = {
      'type': 'loadAll',
      'sendToAll': false,
      'user': user
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

   $(document).mouseup(function(){
        console.log('clicked');
       
        user.color = user.generateColor();

       var msg = {
           type: 'updateColor',
           sendToAll: true,
           user: user

       };
       
       ws.send(JSON.stringify(msg));
         });  
}

