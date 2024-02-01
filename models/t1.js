"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const T1Schema = new Schema({
    words: [{ type: String }],
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
T1Schema.methods = {};

module.exports = {
    T1Schema
};
