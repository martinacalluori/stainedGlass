$(function() {      
      //Enable swiping...
      $(".container").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          $(this).text("You swiped " + direction );

          if(direction == 'up') {
            var msg = {
           type: 'addGlass',
           sendToAll: true,
           user: user  
        };

        ws.send(JSON.stringify(msg));
          }
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
      });
    });
