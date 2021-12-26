const { Schema, model } = require('mongoose');

const ContactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    birthday: {
        type: Date,
    },
    createdBy: {
        type: String,
        required: [true, 'It must be created by user']
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

ContactSchema.methods.toJSON = function () {
    const { __v, ...contact } = this.toObject();
    return contact;
}

module.exports = model('Contact', ContactSchema);