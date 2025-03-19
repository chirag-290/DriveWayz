const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 8000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`server running at port ${port}`);
});