var serand = require('serand');
var io = require('socket.io');

var consol;

var HUB = 'wss://hub.serandives.com:4000/app';

var hub = io.connect(HUB, {
    transports: ['websocket']
});

hub.once('connect', function () {
    hub.on('done', function (options) {
        console.log(options);
        consol.append(options.data);
    });
});

serand.on('hub', 'drones start', function (data) {
    console.log('received event');
    console.log(data);
    hub.emit('drones start', data);
});
