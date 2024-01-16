const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const healthRouter = require('./routes/health');
const wordsRouter = require('./routes/words');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/health', healthRouter);
app.use('/words', wordsRouter);

module.exports = app;
