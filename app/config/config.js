module.exports = {
    dbHost: (process.env.MONGO_LOGIN && process.env.MONGO_PWD) ? 'mongodb://' + process.env.MONGO_LOGIN + ':' + process.env.MONGO_PWD + '@ds251362.mlab.com:51362/doemais' : 'mongodb://localhost:27017/doemais',
    port: process.env.PORT || 3003,
    secret: 'doemais',
    viewsPath: './app/modules/web'
};
