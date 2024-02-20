const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require("./utils/loggerUtils");
const morganMiddleware = require("./middlewares/morganMiddleware");

const healthRouter = require('./routes/health');
const wordsRouter = require('./routes/words');
const timewordsRouter = require('./routes/timewords');
const configRouter = require('./routes/config');
const databaseUtils = require('./utils/databaseUtils');
const configService = require('./services/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
    { origin: process.env.MMRB_ENV === 'docker'
        ? ['http://119.3.156.32:3400', 'http://hw.piggy.instance:3400']
        : '*' })
);
app.use(morganMiddleware);
app.use('/health', healthRouter);
app.use('/words', wordsRouter);
app.use('/timewords', timewordsRouter);
app.use('/config', configRouter);

databaseUtils.connect();

const port = process.env.PORT || 3401;
app.listen(port, () => {
    (async () => { await configService.checkAndInitializeConfig(); })();
    logger.info(`MMRService is running at ${port}`);
})

module.exports = app;
