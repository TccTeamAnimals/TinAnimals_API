const route = require('./socket.routes');

module.exports = (io) => {
  route(io);
}
