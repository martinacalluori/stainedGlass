var host = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(host);
var socket = null;
var user = new User();
  
window.onload = function() {

    $('.id').html(user.id);


    if(user.mobile){

      $('body').attr('data-mobile-user', true);
      // $('body').css('background', user.color);

    }


 // // function to be called to send the glass to the table
// function throwGlass(glassData) {
//   socket.emit('phone-throw-glass', glassData);
// }


    // addGlass.swipe() {
    //  function throwGlass(glassData) {
    //  socket.emit('phone-throw-glass', glassData);

    //   console.log('works 4 me');
    // }
  // };


  //   var glass = {
  //      shape: 'square',
  //      color: 'red',
  //      }
  //   var msg = {
  //      type: 'addGlass',
  //      sendToAll: true,
  //      glass: glass
  //   }



    
	ws.onopen = function() {

    console.log(user);
    //add back load all message and send message in user.js

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
           
        };
       
       ws.send(JSON.stringify(msg));
     
    });  
}

// var socket = io.connect(YOUR_NODEJS_SERVER_URL);
             

