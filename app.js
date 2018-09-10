const server = require('./config/server');
require('./config/db');
require('./app/routes')(server.app, server.router);
