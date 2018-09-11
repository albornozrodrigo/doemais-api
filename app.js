const server = require('./app/config/server');
require('./app/config/db');
require('./app/routes')(server);
