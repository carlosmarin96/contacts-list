const { response, request } = require('express');

const Contact = require('../models/contact');



const getContacts = async (req = request, res = response) => {

    res.json('ok');
    //     const { limit = 8, since = 0 } = req.query;
    //     const idFromUser = req.user.id;

    //     const [total, contacts] = await Promise.all([
    //         Contact.countDocuments({ createdBy: idFromUser }),
    //         Contact.find({ createdBy: idFromUser })
    //             .skip(Number(since))
    //             .limit(Number(limit))
    //     ]);

    //     res.json({
    //         total,
    //         contacts
    //     });
}

const postContact = async (req, res = response) => {
    const { name, lastName, email, phone, company, birthday } = req.body;

    const createdBy = req.user._id;

    // Validate if email is unqiue or not
    const notUniqueEmail = await Contact.findOne({ email: email, createdBy: createdBy });

    if (notUniqueEmail) {
        return res.status(400).json({
            msg: `Email ${notUniqueEmail.email} is already register`
        });
    }

    // Verify if phone is unique or not
    if (phone) {
        const notUniquePhone = await Contact.findOne({ phone: phone, createdBy: createdBy });
        if (notUniquePhone) {
            return res.status(400).json({
                msg: `Phone ${notUniquePhone.phone} is already register`
            });
        }
    }

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