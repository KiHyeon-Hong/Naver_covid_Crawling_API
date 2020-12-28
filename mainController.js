const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(express.static('View'));
app.use(express.static('view'));

const index = require('./controller/index.js');

app.use('/', index);

app.listen(65001, () => {
	console.log('koreaCovidAPI running at 65001');
});
