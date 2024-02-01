const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require("./utils/loggerUtils");
const morganMiddleware = require("./middlewares/morganMiddleware");

const healthRouter = require('./routes/health');
const wordsRouter = require('./routes/words');
const databaseUtils = require('./utils/databaseUtils');

const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(morganMiddleware);
app.use('/health', healthRouter);
app.use('/words', wordsRouter);

databaseUtils.connect();

const port = process.env.PORT || 3101;
app.listen(port, () => {
    logger.info(`MMRService is running at ${port}`);
})

module.exports = app;
