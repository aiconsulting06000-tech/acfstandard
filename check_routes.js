const http = require('http');
const urls = ['/', '/standard', '/framework', '/method', '/control', '/certification', '/partners', '/academy', '/about', '/contact'];
(async () => {
	for (const u of urls) {
		await new Promise(res => {
			const req = http.get('http://localhost:3000' + u, (r) => {
				console.log(u + ' : ' + r.statusCode);
				res();
			});
			req.on('error', e => {
				console.log(u + ' : ERROR - ' + e.message);
				res();
			});
		});
	}
})();
