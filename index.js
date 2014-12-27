var serand = require('serand');
var io = require('socket.io');

var HUB = 'wss://hub.serandives.com:4000/app';

var hub;

var start = function (data) {
    console.log('received event:drone start');
    console.log(data);
    hub.emit('drone start', data);
};

var stop = function (data) {
    console.log('received event:drone stop');
    console.log(data);
    hub.emit('drone stop', data);
};

var selfup = function (data) {
    console.log('received event:self up');
    console.log(data);
    hub.emit('self up', data);
};

var clientup = function (data) {
    console.log('received event:clients up');
    console.log(data);
    hub.emit('clients up', data);
};

var restart = function (data) {
    hub.emit('domain restart', data);
};

serand.on('user', 'logged in', function (data) {
    hub = io.connect(HUB, {
        transports: ['websocket'],
        query: 'token=' + data.access
    });

    hub.once('connect', function () {
        hub.on('drone started', function (data) {
            console.log(data);
        });
    });
    serand.on('hub', 'drone start', start);
    serand.on('hub', 'drone stop', stop);
    serand.on('hub', 'self up', selfup);
    serand.on('hub', 'clients up', clientup);
    serand.on('hub', 'domain restart', restart);
});

serand.on('user', 'logged out', function (data) {
    serand.off('hub', 'drone start', start);
    serand.off('hub', 'drone stop', stop);
    serand.off('hub', 'self up', selfup);
    serand.off('hub', 'clients up', clientup);
    serand.off('hub', 'domain restart', restart);
});