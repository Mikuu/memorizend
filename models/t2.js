"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
const T2Schema = new Schema({
    words: [{ type: String }],
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
T2Schema.methods = {};

module.exports = {
    T2Schema
};
