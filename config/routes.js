const index = require('../app/web/index/index.controller');

const routes = (app) => {
    app.get('/', (req, res) => {
        index.render(req, res);
    });
}

module.exports = routes;
