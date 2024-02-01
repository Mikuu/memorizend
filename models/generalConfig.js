"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const GeneralConfigSchema = new Schema({
    wordsEveryday: { type: Number, default: 2 },
    t0activeTime: { type: String, default: "", trim: true, maxlength: 20 },
    t1activeTime: { type: String, default: "", trim: true, maxlength: 20 },
    t2activeTime: { type: String, default: "", trim: true, maxlength: 20 },
    t3activeTime: { type: String, default: "", trim: true, maxlength: 20 },
    t4activeTime: { type: String, default: "", trim: true, maxlength: 20 },
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
GeneralConfigSchema.methods = {};

module.exports = {
    GeneralConfigSchema
};
