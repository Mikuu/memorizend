"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const T3Schema = new Schema({
    words: [{ type: String }],
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
T3Schema.methods = {};

module.exports = {
    T3Schema
};
