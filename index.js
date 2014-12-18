var serand = require('serand');
var io = require('socket.io');

var HUB = 'wss://hub.serandives.com:4000/app';

serand.on('user', 'logged in', function (data) {
    var hub = io.connect(HUB, {
        transports: ['websocket'],
        query: 'token=' + data.token
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

    serand.on('hub', 'drone stop', function (data) {
        console.log('received event');
        console.log(data);
        hub.emit('drone stop', data);
    });

    serand.on('hub', 'self up', function (data) {
        console.log('received event');
        console.log(data);
        hub.emit('self up', data);
    });

    serand.on('hub', 'clients up', function (data) {
        console.log('received event');
        console.log(data);
        hub.emit('clients up', data);
    });

    serand.on('hub', 'domain restart', function (data) {
        hub.emit('domain restart', data);
    });
});