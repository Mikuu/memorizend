"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wordStatus = require("./wordStatus");

/**
 * Schema
 */
const WordSchema = new Schema({
    word: { type: String, default: "", trim: true, maxlength: 1200 },
    // wid: { type: Number, default: null },
    wid: { type: String, default: "", trim: true, maxlength: 100 },
    status: { type: String, default: "POOL", enum: Object.values(wordStatus), trim: true },
    completedAt: { type: String, default: "", trim: true, maxlength: 20 },
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
