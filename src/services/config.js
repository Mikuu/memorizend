const mongoose = require("mongoose");
const { ConfigSchema } = require("../models/config");

const Config = new mongoose.model('Config', ConfigSchema);

const initializeConfig = async () => {
    const config = await Config();
    return await config.save();
};

const getWordsPerDay = async () => {
    const config = await Config.findOne({ configName: "general" });
    return config.wordsPerDay;
};

module.exports = {
    initializeConfig,
    getWordsPerDay,
}
