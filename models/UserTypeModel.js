const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserTypeSchema = mongoose.Schema({
    _id: { type: Number },
    name: { type: String }
});

//Setup unique validation on schema
UserTypeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user_types', UserTypeSchema);