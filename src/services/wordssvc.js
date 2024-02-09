const mongoose = require("mongoose");
const { WordSchema } = require("../models/words");
const { wordUuid } = require("../utils/uuidUtils");
const wordStatus = require('../models/wordStatus');

const Word = new mongoose.model('Word', WordSchema);

const createWordsInBulk = async (words) => {
    const wordsToInsert = words.map(word => {
        return {
            word: word.word,
            chinese: word.chinese,
            exampleSentence: word.exampleSentence,
            pronunciation: word.pronunciation,
            difficulty: word.difficulty,
            wid: wordUuid(),
            status: wordStatus.POOL,
            inDay: null,
            startedOn: null,
            completedM5On: null,
            completedM30On: null,
            completedH12On: null,
            completedD1On: null,
            completedD2On: null,
            completedD4On: null,
            completedD7On: null,
            completedD15On: null,
            completedOn: null
        }
    });

    const savedDocuments = await Word.insertMany(wordsToInsert);
    return savedDocuments.length;
};

const fetchWords = async (condition) => {
    return await Word.find(condition);
};

const getWordByWid = async (wid) => {
    return await Word.findOne({ wid });
};

const cleanWords = async () => {
    const  res = await Word.deleteMany({});
    return res.deletedCount;
};

module.exports = {
    createWordsInBulk,
    fetchWords,
    getWordByWid,
    cleanWords,
}
