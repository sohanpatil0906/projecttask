const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// const AutoIncrement = require('../helpers/mongooseAutoIncrement');

const meetingSchema = new mongoose.Schema({
    hostId:{type: String},
    hostfullname:{type: String},
    particpantId:{type: String},
    particpantfullname:{type: String},
    starttime: {type: String},
    endtime: {type: String},
    CreatedBy: {type: String},
    UpdatedBy: {type: String},
    CreatedAt: {type: String},
    UpdatedAt: {type: String},
    status: {type: String},
    createdBy: {type: require('mongoose').Types.ObjectId, ref: 'users'}
});



module.exports = mongoose.model('meetings', meetingSchema);