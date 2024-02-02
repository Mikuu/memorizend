const mongoose = require("mongoose");
const { WordSchema } = require("../models/words");
const { wordUuid } = require("../utils/uuidUtils");
const wordStatus = require('../models/wordStatus');
const configService = require('../services/config');

const Word = new mongoose.model('Word', WordSchema);

const getT0Words = async () => {
    const wordsPerDay = await configService.getWordsPerDay();
    return await Word.find({ status: wordStatus.POOL }).limit(wordsPerDay);
};
// ToDo: refactor to reuse function.
const completeT0Words = async () => {
    let updatedWords = [];
    const words = await getT0Words();
    for (const word of words) {
        const result = await Word.updateOne({ wid: word.wid }, { status: wordStatus.M5 })

        if (result.modifiedCount) {
            updatedWords.push(word);
        }
    }

    return updatedWords;
};

const getT1Words = async () => {
    return await Word.find({ status: wordStatus.M5 });
};

const completeT1Words = async () => {
    const words = await getT1Words();
    for (const word of words) {
        await Word.updateOne({ wid: word.wid }, { status: wordStatus.M30 })
    }
};

const getT2Words = async () => {
    return await Word.find({ status: wordStatus.M30 });
};

const completeT2Words = async () => {
    const words = await getT2Words();
    for (const word of words) {
        await Word.updateOne({ wid: word.wid }, { status: wordStatus.H12 })
    }
};

const getT3Words = async () => {
    return await Word.find({ status: wordStatus.H12 });
};

const completeT3Words = async () => {
    const words = await getT3Words();
    for (const word of words) {
        await Word.updateOne({ wid: word.wid }, { status: wordStatus.D1 })
    }
};

const getCrossDaysWords = async () => {
    const crossDaysStatus = [wordStatus.D1, wordStatus.D2, wordStatus.D4, wordStatus.D7, wordStatus.D15];
    return await Word.find({ status: { $in: crossDaysStatus } });
};

const completeCrossDaysWords = async () => {
    const crossDaysWords = await getCrossDaysWords();
    for (const word of crossDaysWords) {
        switch (word.status) {
            case wordStatus.D1:
                Word.updateOne({ wid: word.wid }, { status: wordStatus.D2 });
                break;
            case wordStatus.D2:
                Word.updateOne({ wid: word.wid }, { status: wordStatus.D4 });
                break;
            case wordStatus.D4:
                Word.updateOne({ wid: word.wid }, { status: wordStatus.D7 });
                break;
            case wordStatus.D7:
                Word.updateOne({ wid: word.wid }, { status: wordStatus.D15 });
                break;
            case wordStatus.D15:
                Word.updateOne({ wid: word.wid }, { status: wordStatus.COMPLETED });
                break;
        }
    }
};

module.exports = {
    getT0Words,
    completeT0Words,
    getT1Words,
    completeT1Words,
    getT2Words,
    completeT2Words,
    getT3Words,
    completeT3Words,
    getCrossDaysWords,
    completeCrossDaysWords
}
