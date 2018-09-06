const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('./cors');
const port = 3003;

app.set('view engine', 'ejs');
app.set('views', './app/web');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);
app.use(express.static("."));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

module.exports = app;
