require('express-group-routes');
const index = require('./modules/web/index/controller');
const partner = require('./modules/web/partner/controller');
const about = require('./modules/web/about/controller');
const statistics = require('./modules/web/statistics/controller');
const howItWorks = require('./modules/web/how-it-works/controller');
const contact = require('./modules/web/contact/controller');
const thanks = require('./modules/web/thanks/controller');

const user = require('./modules/api/user/controller');
const bloodCenter = require('./modules/api/bloodCenter/controller');
const campaign = require('./modules/api/campaign/controller');
const bot = require('./modules/api/bot/controller');
const authMiddleware = require('./middlewares/auth');

const webRoutes = (router) => {
    router.get('/', index.render);
    router.get('/partner', partner.render);
    router.get('/about', about.render);
    router.get('/statistics', statistics.render);
    router.get('/how-it-works', howItWorks.render);
    router.get('/contact', contact.render);
    router.get('/thanks', thanks.render);
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
        
        // Me
        router.get('/me', user.me);
        router.put('/me', user.updateMe);
        
        // BloodCenters
        router.get('/blood-centers', bloodCenter.getAll);
        router.post('/blood-centers/geolocation', bloodCenter.getByGeolocation);
        router.post('/blood-centers', bloodCenter.create);
        
        // Campaigns
        router.get('/campaigns', campaign.getMyCampaigns);
        router.post('/campaigns/geolocation', campaign.getByGeolocation);
        router.post('/campaigns', campaign.create);
        router.put('/campaigns', campaign.update);
        router.put('/campaigns/enjoy', campaign.enjoy);
        router.delete('/campaigns/:id', campaign.delete);
    });
}

module.exports = (server) => {
    authRoutes(server.router);
    botRoutes(server.router);
    webRoutes(server.router);
    apiRoutes(server.router);
    server.app.use(server.router);
}
