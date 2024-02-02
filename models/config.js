"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema
 */
// const shiftDays = new Schema({ name: String});

const ConfigSchema = new Schema({
    configName: { type: String, default: "general", trim: true, maxlength: 20 },
    wordsPerDay: { type: Number, default: 2 },
    t0shiftTime: { type: Number, default: 0 },      // by minutes
    t1shiftTime: { type: Number, default: 5 },      // by minutes
    t2shiftTime: { type: Number, default: 30 },     // by minutes
    t3shiftTime: { type: Number, default: 60*12 },  // by minutes
    t4shiftTime: { type: Array, default: [1,2,4,7,15] },    // my days
}, { timestamps: true });

/**
 * Validations
 */


/**
 * Methods
 */
ConfigSchema.methods = {};

module.exports = {
    ConfigSchema
};
