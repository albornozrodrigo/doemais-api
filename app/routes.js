require('express-group-routes');
const index = require('./modules/web/index/controller');
const user = require('./modules/api/user/controller');
const bloodCenter = require('./modules/api/bloodCenter/controller');
const bot = require('./modules/api/bot/controller');
const authMiddleware = require('./middlewares/auth');

const webRoutes = (router) => {
    router.get('/', index.render);
}

const authRoutes = (router) => {
    router.group('/auth', (router) => {
        router.post('/register', user.create);
        router.post('/login', user.login);
    });
}

const botRoutes = (router) => {
    router.post('/bot', bot.getFulfillment);
}

const apiRoutes = (router) => {
    router.use('/api', authMiddleware);
    router.group('/api', (router) => {
        router.get('/', (req, res) => res.send('API'));
        router.get('/me', user.me);
        router.get('/users', user.getAll);
        router.get('/blood-centers', bloodCenter.getAll);
        router.post('/blood-centers/geolocation', bloodCenter.getByGeolocation);
        router.post('/blood-centers', bloodCenter.create);
    });
}

module.exports = (server) => {
    authRoutes(server.router);
    botRoutes(server.router);
    webRoutes(server.router);
    apiRoutes(server.router);
    server.app.use(server.router);
}
