let mongodbUrl;

switch (process.env.MMRB_ENV) {
    case "docker":
        // this connects mongodb through docker bridge network which is inside the mongodb container, thus can only work with the default port 27017.
        mongodbUrl = `mongodb://${process.env.MMRB_DB_USERNAME}:${process.env.MMRB_DB_PASSWORD}@mmrbackendb:27017/mmrbackendb`;
        break;
    default:
        mongodbUrl = `mongodb://${process.env.MMRB_DB_USERNAME}:${process.env.MMRB_DB_PASSWORD}@127.0.0.1:27098/mmrbackendb`;
        break;
}

console.log(mongodbUrl);

module.exports = {
    mongodbUrl,
};
