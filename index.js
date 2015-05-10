var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3334 });

server.route({
	method: 'get',
	path: '/test',
	handler: function (request, reply) {
		return reply().code(400);
	}
});

server.register({register: require('hapi-dash')}, function (err) {
	if (err) {
		console.error('Failed to load plugin:', err);
	}
});

server.start(function () {
	console.log('Server running at:', server.info.uri);
});

// send some dummy data to the server.
var sendRequest = function () {
	server.inject('/', function (res) {
	});
};

(function loop() {
	var rand = Math.round(Math.random() * (2000 - 100)) + 100;
	setTimeout(function() {
			sendRequest();
			loop();
	}, rand);
}());
