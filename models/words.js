"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wordStatus = require("./wordStatus");

/**
 * Schema
 */
const WordSchema = new Schema({
    word: { type: String, default: "", trim: true, maxlength: 50 },
    chinese: { type: String, default: "", trim: true, maxlength: 50 },
    pronunciation: { type: String, default: "", trim: true, maxlength: 200 },
    exampleSentence: { type: String, default: "", trim: true, maxlength: 1200 },
    difficulty: { type: Number, default: 0 },
    // wid: { type: Number, default: null },
    wid: { type: String, default: "", trim: true, maxlength: 100 },
    status: { type: String, default: "POOL", enum: Object.values(wordStatus), trim: true },
    startedOn: { type: Date },
    completedOn: { type: Date },
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
WordSchema.methods = {};

module.exports = {
    WordSchema
};
