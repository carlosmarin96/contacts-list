const { Schema, model } = require('mongoose');

const GenderSchema = Schema({
    gender: {
        type: String,
        required: [true, 'Gender is required']
    }
});


module.exports = model('Gender', GenderSchema)