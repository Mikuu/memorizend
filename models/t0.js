"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const T0Schema = new Schema({
    words: [{ type: String }],
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
T0Schema.methods = {};

module.exports = {
    T0Schema
};
