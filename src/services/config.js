const mongoose = require("mongoose");
const { ConfigSchema } = require("../models/config");

const Config = new mongoose.model('Config', ConfigSchema);

const getConfig = async () => {
    return await Config.findOne({ configName: "general" });
};

const initializeConfig = async () => {
    const config = await Config();
    return await config.save();
};

const getWordsPerDay = async () => {
    const config = await Config.findOne({ configName: "general" });
    return config.wordsPerDay;
};

const updateConfig = async (config) => {
    const result = await Config.updateOne({ configName: "general" }, {
        wordsPerDay: config.wordsPerDay,
        t0shiftTime: config.t0shiftTime,
        t1shiftTime: config.t1shiftTime,
        t2shiftTime: config.t2shiftTime,
        t3shiftTime: config.t3shiftTime,
        t4shiftTime: config.t4shiftTime,
    });

    return result.modifiedCount;
};

module.exports = {
    getConfig,
    initializeConfig,
    getWordsPerDay,
    updateConfig,
}
