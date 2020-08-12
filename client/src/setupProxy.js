const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware;

module.exports = function(app) {
  app.use(
    proxy(['/api', '/auth/google', '/test'], {
      target: 'http://localhost:8000'
    })
  );
};
