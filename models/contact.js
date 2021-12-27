const { Schema, model } = require('mongoose');

const ContactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['female', 'male', 'other']
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
        type: Schema.Types.ObjectId,
        ref: 'User',
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