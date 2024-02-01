let mongodbUrl;

switch (process.env.MMRB_ENV) {
    case "docker":
        mongodbUrl = `mongodb://${process.env.MMRB_DB_USERNAME}:${process.env.MMRB_DB_PASSWORD}@mmrb-mongodb:27098/mmrbackendb`;
        break;
    default:
        mongodbUrl = `mongodb://${process.env.MMRB_DB_USERNAME}:${process.env.MMRB_DB_PASSWORD}@127.0.0.1:27098/mmrbackendb`;
        break;
}

console.log(mongodbUrl);

module.exports = {
    mongodbUrl,
};
