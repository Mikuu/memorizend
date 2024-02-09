const morgan = require("morgan");
const logger = require("../utils/loggerUtils");

const stream = {
    write: (message) => logger.http(message.replace(/\n$/, '')),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

morgan.token("req-body", (req) => JSON.stringify(req.body));

const morganMiddleware = morgan(
    (tokens, req, res) => {
        const method = tokens.method(req, res);

        const formatting = [
            method,
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
        ].join(" ");

        if (method === 'POST' || method === 'PUT') {
            return formatting + `, payload=${tokens["req-body"](req, res)}`;
        }

        return formatting;
    },
    { stream, skip }
);

module.exports = morganMiddleware;
