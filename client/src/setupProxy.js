const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware;

module.exports = function(app) {
  app.use(
    proxy(['/api', '/auth/google'], {
      target: 'http://localhost:8000'
    })
  );
};
