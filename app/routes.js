require('express-group-routes');
const index = require('./web/index/controller');
const user = require('./api/user/controller');
const bloodCenter = require('./api/bloodCenter/controller');

const webRoutes = (router) => {
    router.get('/', index.render);
}

const apiRoutes = (router) => {
    router.group('/api', (router) => {
        router.get('/', (req, res) => res.send('API'));

        router.post('/register', user.create);
        router.post('/login', user.login);

        router.get('/blood-centers', bloodCenter.getAll);
        router.post('/blood-centers', bloodCenter.create);
    });
}

module.exports = (app, router) => {
    webRoutes(router);
    apiRoutes(router);
    app.use(router);
}
