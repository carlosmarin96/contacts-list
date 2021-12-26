const { response, request } = require('express');

const Contact = require('../models/contact');



const getContacts = async (req = request, res = response) => {
    const { limit = 8, since = 0 } = req.query;
    const idFromUser = req.user.id;

    const [total, contacts] = await Promise.all([
        Contact.countDocuments({ createdBy: idFromUser }),
        Contact.find({ createdBy: idFromUser })
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        contacts
    });
}

const postContact = async (req, res = response) => {
    const { name, lastName, email, phone, company, birthday } = req.body;

    const createdBy = req.user._id;

    const contact = new Contact({ name, lastName, email, phone, company, birthday, createdBy });

    await contact.save();

    res.json({
        contact
    });
}

module.exports = {
    getContacts,
    postContact
}