const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Contact } = require('../models');

const searchContacts = async (term = '', idFromUser = '', res = response) => {

    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
        const contact = await Contact.find({ _id: term }, { createdBy: idFromUser });
        return res.json({
            results: (contact) ? [contact] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const contacts = await Contact.find({
        $or: [{ name: regex }, { email: regex }],
        $and: { createdBy: idFromUser }
    });

    res.json({
        results: contacts
    });
}

const search = (req, res = response) => {

    const { term } = req.params;

    const idFromUser = req.user._id;

    searchContacts(term, idFromUser, res);
}


module.exports = {
    search
}