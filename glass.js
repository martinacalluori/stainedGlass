var cards = [];
var idCounter = 0;
var socket = null;
var serverURL = window.location.hostname + ":" +  window.location.port;
var tableId = window.location.search.substring(4);
var compassDiff = 0;
var compassDirection = 0;
var isCompassAttached = false; 

// on ready
document.addEventListener( 'DOMContentLoaded', function () {
    
    // init a deck of 10 cards
    init(10);

    // connect to websocket server
    socket = io.connect(serverURL);

    // register phone connection
    socket.emit('phone-connect', tableId);   

    // init touch events in phone
    var touchTrack = new TouchTrack();
    touchTrack.init(document.getElementById("touchHandler"), touchStart, touchMove, touchEnd);

    // Obtain a new *world-oriented* Full Tilt JS DeviceOrientation Promise
    var promise = FULLTILT.getDeviceOrientation({ 'type': 'world' });

    // Wait for Promise result
    promise.then(function(deviceOrientation) { // Device Orientation Events are supported

        // Register a callback to run every time a new 
        // deviceorientation event is fired by the browser.
        deviceOrientation.listen(function() {

            // Get the current *screen-adjusted* device orientation angles
            var currentOrientation = deviceOrientation.getScreenAdjustedEuler();

            // Calculate the current compass heading that the user is 'looking at' (in degrees)
            compassDirection = (180 - currentOrientation.alpha)*2;

        });

    }).catch(function(errorMessage) { // Device Orientation Events are not supported
        console.log(errorMessage);
    });

    // ... and update phone direction each 100 ms
    setInterval(function() {
        socket.emit("phone-move", { tableId: tableId, angle: getCompassDirection() });
    }, 100);

}, false);

// CARD FUNCTIONS

function addGlass() {
    // adds a new piece of glass 
    var randomCard = getRandomGlass();
    var card = {
      "id": "card" + idCounter ++,
      "suit": randomCard.suit,
      "rank": randomCard.rank
    };
    glass.push(glass);
    
    document.getElementById("touchHandler").innerHTML += 
        `<div class="item">
            <div id="${glass.id}" class="glass ${glass.suit} rank${glass.rank}">
                <div class="face"/>
            </div>
        </div>`;
}



// SWIPE EVENTS


function touchMove(evt, x, y, offsetX, offsetY) {
    evt.preventDefault();
}

function touchEnd(x, y, offsetX, offsetY, timeTaken) {
    // 10 pixels swipe up = min threshold
    if(-offsetY < 10) {
        return;
    }
}
