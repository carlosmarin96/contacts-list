const { response } = require('express');

const Contact = require('../models/contact');

const postContact = async (req, res = response) => {
    const { name, lastName, email, phone, company, birthday } = req.body;

    const contact = new Contact({ name, lastName, email, phone, company, birthday });

    await contact.save();

    res.json({
        contact
    });
}