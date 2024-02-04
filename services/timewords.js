const mongoose = require("mongoose");
const { WordSchema } = require("../models/words");
const { wordUuid } = require("../utils/uuidUtils");
const wordStatus = require('../models/wordStatus');
const wordTime = require('../models/wordTime');
const configService = require('../services/config');
const wordService = require('../services/wordssvc');

const Word = new mongoose.model('Word', WordSchema);

const checkIfCrossDaysWordIsReadyOnTime = (word) => {
    const checkTimeDifference = (startedTime, currentTime, differenceInDays) => {
        const timeDifference = currentTime - startedTime;
        return timeDifference >= (24 * 60 * 60 * 1000 * differenceInDays);
    }

    let differenceInDays;
    switch (word.status) {
        case wordStatus.D1:
            differenceInDays = 1;
            break;
        case wordStatus.D2:
            differenceInDays = 2;
            break;
        case wordStatus.D4:
            differenceInDays = 4;
            break;
        case wordStatus.D7:
            differenceInDays = 7;
            break;
        case wordStatus.D15:
            differenceInDays = 15;
            break;
    }

    const currentTime = new Date();
    const startedTime = word.startedOn;

    return checkTimeDifference(startedTime, currentTime, differenceInDays);
};

const getWords = async (time) => {
    let words;
    switch (time) {
        case wordTime.T0:
            const wordsPerDay = await configService.getWordsPerDay();
            words = await Word.find({ status: wordStatus.POOL }).limit(wordsPerDay);
            break;
        case wordTime.T1:
            words = await Word.find({ status: wordStatus.M5 });
            break;
        case wordTime.T2:
            words = await Word.find({ status: wordStatus.M30 });
            break;
        case wordTime.T3:
            words = await Word.find({ status: wordStatus.H12 });
            break;
        case wordTime.CrossDays:
            const crossDaysStatus = [wordStatus.D1, wordStatus.D2, wordStatus.D4, wordStatus.D7, wordStatus.D15];
            words = await Word.find({ status: { $in: crossDaysStatus } });
            words = words.filter(word => checkIfCrossDaysWordIsReadyOnTime(word));
            break;
    }

    return words;
};

const checkAndUpdateCrossDaysWords = async (wids2Complete) => {
    const result = { modifiedCount: 0 };
    const updateWordStatus = async word => {
        switch (word.status) {
            case wordStatus.D1:
                word.status = wordStatus.D2;
                break;
            case wordStatus.D2:
                word.status = wordStatus.D4;
                break;
            case wordStatus.D4:
                word.status = wordStatus.D7;
                break;
            case wordStatus.D7:
                word.status = wordStatus.D15;
                break;
            case wordStatus.D15:
                word.status = wordStatus.COMPLETED;
                break;
        }
        await word.save();
    }

    for (const wid of wids2Complete) {
        const word = await wordService.getWordByWid(wid);
        await updateWordStatus(word);
        result.modifiedCount += 1;
    }

    return result;
};

const completeWords = async (time, wids2complete) => {
    let result;
    const checkUpdatedResultCount = (result) => {
        if (result.modifiedCount !== wids2complete.length) {
            console.warn(`Not all words status changed for ${wids2complete}, only ${result.modifiedCount} updated`);
        }
    };

    switch (time) {
        case wordTime.T0:
            const currentTime = new Date();
            result = await Word.updateMany({ wid: { $in: wids2complete } }, { status: wordStatus.M5, startedOn: currentTime });
            checkUpdatedResultCount(result);
            break;
        case wordTime.T1:
            result = await Word.updateMany({ wid: { $in: wids2complete } }, { status: wordStatus.M30 });
            checkUpdatedResultCount(result);
            break;
        case wordTime.T2:
            result = await Word.updateMany({ wid: { $in: wids2complete } }, { status: wordStatus.H12 });
            checkUpdatedResultCount(result);
            break;
        case wordTime.T3:
            result = await Word.updateMany({ wid: { $in: wids2complete } }, { status: wordStatus.D1 });
            checkUpdatedResultCount(result);
            break;
        case wordTime.CrossDays:
            result = await checkAndUpdateCrossDaysWords(wids2complete);
            checkUpdatedResultCount(result)
            break;
    }

    return result.modifiedCount;
};

const getT0Words = async () => {
    return await getWords(wordTime.T0);
};

const getT1Words = async () => {
    return await getWords(wordTime.T1);
};

const getT2Words = async () => {
    return await getWords(wordTime.T2);
};

const getT3Words = async () => {
    return await getWords(wordTime.T3);
};

const getCrossDaysWords = async () => {
    return await getWords(wordTime.CrossDays);
};

const completeT0Words = async (wids2complete) => {
    return await completeWords(wordTime.T0, wids2complete);
};

const completeT1Words = async (wids2complete) => {
    return await completeWords(wordTime.T1, wids2complete);
};

const completeT2Words = async (wids2complete) => {
    return await completeWords(wordTime.T2, wids2complete);
};

const completeT3Words = async (wids2complete) => {
    return await completeWords(wordTime.T3, wids2complete);
};

const completeCrossDaysWords = async (wids2complete) => {
    return await completeWords(wordTime.CrossDays, wids2complete);
};

module.exports = {
    getT0Words,
    getT1Words,
    getT2Words,
    getT3Words,
    getCrossDaysWords,
    completeT0Words,
    completeT1Words,
    completeT2Words,
    completeT3Words,
    completeCrossDaysWords
}
