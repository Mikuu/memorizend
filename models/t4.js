"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const T4Schema = new Schema({
    words: [{ type: String }],
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
T4Schema.methods = {};

module.exports = {
    T4Schema
};
