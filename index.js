var hapi = require('hapi');
var randomWords = require('random-words');

var server = new hapi.Server();
server.connection({ port: 3334 });

var methods = ['get', 'post', 'delete', 'put'];

server.route({
	method: methods,
	path: '/{params*}',
	handler: function (request, reply) {
		var statusCodes = [200,201, 204, 400, 401, 404, 500];
		return reply().code(statusCodes[Math.floor(Math.random() * statusCodes.length)]);
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
	var method = methods[Math.floor(Math.random() * methods.length)];
	server.inject({ method: method, url: '/' + randomWords() }, function (res) {
	});
};

(function loop() {
	var rand = Math.round(Math.random() * (500 - 10)) + 10;
	setTimeout(function() {
			sendRequest();
			loop();
	}, rand);
}());
