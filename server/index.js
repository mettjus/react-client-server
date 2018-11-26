const express = require('express');
const app = express();
const httpProxy = require('http-proxy');

const { SERVER_PORT = '5500', DEV_SERVER_PROXY_TARGET = 'http://localhost:5600' } = process.env;

app.get('/api/me', (req, res, next) => {
	res.json({
		message: 'Welcome',
	});
});

if (DEV_SERVER_PROXY_TARGET) {
	const proxy = httpProxy.createProxyServer();
	app.use('*', (req, res, next) => {
		req.url = req.originalUrl;
		proxy.web(
			req,
			res,
			{
				target: DEV_SERVER_PROXY_TARGET,
				changeOrigin: true,
			},
			next
		);
	});
} else {
	const buildDir = path.resolve(__dirname, '../client/build-complete');
	app.use(express.static(buildDir));
	app.get('*', requireAuth, (req, res) => {
		res.sendFile(path.resolve(buildDir, 'index.html'));
	});
}

app.listen(parseInt(SERVER_PORT), err => {
  err ? console.error(err) : console.log(`Server started on port ${SERVER_PORT}`);
});
