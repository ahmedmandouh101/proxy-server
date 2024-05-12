const http = require('http');
const httpProxy = require('http-proxy');

// Create a new HTTP proxy server
const proxy = httpProxy.createProxyServer();

// Create a new HTTP server
const server = http.createServer((req, res) => {
    // Log the request details
    console.log(`Proxying request to: ${req.url}`);

    // Proxy the request to the target API
    proxy.web(req, res, { target: 'http://api.example.com' });

    // Handle errors
    proxy.on('error', (err, req, res) => {
        console.error('Proxy Error:', err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Proxy Error');
    });
    
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});
