const { DateTime } = require("luxon");

const generateWordsList = (number) => {
    return Array.from({length: number}, (_, index) => `word${index + 1}`);
}

class MemoryApp {
    constructor(words) {
        this.words = words.reduce((acc, word) => {
            acc[word] = { lastReviewed: null, interval: 0 };
            return acc;
        }, {});
    }

    getWordsForT0(days) {
        const currentTime = this._getCurrentTime(days, 19, 30);
        return this._getWordsForTime(currentTime, 3);
    }

    getWordsForT1(days) {
        const currentTime = this._getCurrentTime(days, 19, 35);
        return this._getWordsForTime(currentTime, 3);
    }

    getWordsForT2(days) {
        const currentTime = this._getCurrentTime(days, 20, 0);
        return this._getWordsForTime(currentTime, 3);
    }

    getWordsForT3(days) {
        if (days === 1) {
            return [];
        }
        const currentTime = this._getCurrentTime(days, 20, 30);
        return this._getWordsForReview(currentTime, [1, 2, 4, 7, 15]);
    }

    getWordsForT4(days) {
        if (days === 1) {
            return [];
        }
        const currentTime = this._getCurrentTime(days, 7, 30);
        const yesterdayT0 = currentTime.minus({ days: 1, hours: 12 });
        return this._getWordsForReview(yesterdayT0, [0]);
    }

    _getCurrentTime(days, hour, minute) {
        return DateTime.local().set({ hour, minute, second: 0, millisecond: 0 }).plus({ days: days - 1 });
    }

    _getWordsForTime(currentTime, numWords) {
        const eligibleWords = Object.entries(this.words)
            .filter(([word, data]) => data.lastReviewed === null || currentTime.diff(data.lastReviewed, "days").days >= data.interval)
            .map(([word]) => word);

        return eligibleWords.slice(0, numWords);
    }

    _getWordsForReview(currentTime, intervals) {
        const eligibleWords = Object.entries(this.words)
            .filter(([word, data]) => data.lastReviewed !== null && currentTime.diff(data.lastReviewed, "days").days >= data.interval)
            .map(([word, data]) => ({ word, interval: data.interval }));

        return eligibleWords.filter(data => intervals.includes(data.interval)).map(data => data.word).slice(0, 15);
    }
}

// 示例用法
const wordsList = generateWordsList(10);
const memoryApp = new MemoryApp(wordsList);

// 调用不同时间点的函数获取需要记忆的单词
const t0Words = memoryApp.getWordsForT0(2);
const t1Words = memoryApp.getWordsForT1(2);
const t2Words = memoryApp.getWordsForT2(2);
const t3Words = memoryApp.getWordsForT3(2);
const t4Words = memoryApp.getWordsForT4(3);

// 输出结果
console.log("t0Words:", t0Words);
console.log("t1Words:", t1Words);
console.log("t2Words:", t2Words);
console.log("t3Words:", t3Words);
console.log("t4Words:", t4Words);
