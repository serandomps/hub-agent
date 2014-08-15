var serand = require('serand');
var io = require('socket.io');

var HUB = 'wss://hub.serandives.com:4000/app';

var hub = io.connect(HUB, {
    transports: ['websocket']
});

hub.once('connect', function () {
    hub.on('drone started', function (data) {
        console.log(data);
    });
});

serand.on('hub', 'drone start', function (data) {
    console.log('received event');
    console.log(data);
    hub.emit('drone start', data);
});
