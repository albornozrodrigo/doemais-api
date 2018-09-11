module.exports = {
    dbHost: 'mongodb://localhost:27017/doemais',
    // dbHost: 'mongodb://'+process.env.MONGO_LOGIN+':'+process.env.MONGO_PWD+'@ds251362.mlab.com:51362/doemais',
    port: process.env.PORT || 3003,
    secret: 'doemais',
    viewsPath: './app/web'
};
