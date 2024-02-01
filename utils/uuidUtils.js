const uuid = require("uuid");

const wordUuid = () => {
    return "WID" + uuid.v4().replace(/-/g, "").toUpperCase();
};

module.exports = {
    wordUuid
}
