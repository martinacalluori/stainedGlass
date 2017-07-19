var socket = io.connect(YOUR_NODEJS_SERVER_URL);
             
// function to be called to send the card to the table
function throwGlass(cardData) {
  socket.emit('phone-throw-card', glassData);
}