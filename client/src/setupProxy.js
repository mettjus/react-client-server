const proxy = require('http-proxy-middleware');
const { SERVER_PORT } = process.env;

module.exports = function(app) {
	app.use(proxy('/api', { target: `http://localhost:${SERVER_PORT}` }));
};
