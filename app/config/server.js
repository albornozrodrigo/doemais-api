const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const cors = require('./cors');
const config = require('./config');

app.set('view engine', 'ejs');
app.set('views', config.viewsPath);
app.set('superSecret', config.secret);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use(express.static("."));
app.use(expressValidator());

app.listen(config.port, () => {
    console.log(`server running on port ${config.port}`);
});

module.exports = { app, router };
