require('express-group-routes');
const authMiddleware = require('./middlewares/auth');

const webModules = {
    index: require('./modules/web/index/controller').render,
    partner: require('./modules/web/partner/controller').render,
    about: require('./modules/web/about/controller').render,
    statistics: require('./modules/web/statistics/controller').render,
    privacy: require('./modules/web/privacy/controller').render,
    chatbot: require('./modules/web/chatbot/controller').render,
    contact: require('./modules/web/contact/controller').render,
    thanks: require('./modules/web/thanks/controller').render
}

const apiModules = {
    user: require('./modules/api/user/controller'),
    bloodCenter: require('./modules/api/bloodCenter/controller'),
    campaign: require('./modules/api/campaign/controller'),
    bot: require('./modules/api/bot/controller'),
    contact: require('./modules/api/contact/controller')
}

const webRoutes = (router) => {
    router.get('/', webModules.index);
    router.get('/partner', webModules.partner);
    router.get('/about', webModules.about);
    router.get('/statistics', webModules.statistics);
    router.get('/privacy-policy', webModules.privacy);
    router.get('/chatbot', webModules.chatbot);
    router.get('/contact', webModules.contact);
    router.get('/thanks', webModules.thanks);
}

const authRoutes = (router) => {
    router.group('/auth', (router) => {
        router.post('/register', apiModules.user.create);
        router.post('/login', apiModules.user.login);
    });
}

const otherRoutes = (router) => {
    router.post('/bot', apiModules.bot.getFulfillment);
    router.post('/contact', apiModules.contact.create);
}

const apiRoutes = (router) => {
    router.use('/api', authMiddleware);
    router.group('/api', (router) => {
        router.get('/', (req, res) => res.send('API'));
        
        // Me
        router.get('/me', apiModules.user.me);
        router.put('/me', apiModules.user.updateMe);
        
        // BloodCenters
        router.get('/blood-centers', apiModules.bloodCenter.getAll);
        router.post('/blood-centers/geolocation', apiModules.bloodCenter.getByGeolocation);
        router.post('/blood-centers', apiModules.bloodCenter.create);
        
        // Campaigns
        router.get('/campaigns', apiModules.campaign.getMyCampaigns);
        router.post('/campaigns/geolocation', apiModules.campaign.getByGeolocation);
        router.post('/campaigns', apiModules.campaign.create);
        router.put('/campaigns', apiModules.campaign.update);
        router.put('/campaigns/enjoy', apiModules.campaign.enjoy);
        router.delete('/campaigns/:id', apiModules.campaign.delete);
    });
}

module.exports = (server) => {
    authRoutes(server.router);
    webRoutes(server.router);
    apiRoutes(server.router);
    otherRoutes(server.router);
    server.app.use(server.router);
}
