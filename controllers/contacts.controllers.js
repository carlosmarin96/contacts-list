const { response, request } = require('express');

const { Contact } = require('../models');



const getContacts = async (req = request, res = response) => {
    const { limit = 8, since = 0 } = req.query;
    const idFromUser = req.user._id;

    const [total, contacts] = await Promise.all([
        Contact.countDocuments({ createdBy: idFromUser }),
        Contact.find({ createdBy: idFromUser })
            .populate('createdBy', 'name')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        contacts
    });
}

const getContactById = async (req = request, res = response) => {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    res.json(contact);
}

const postContact = async (req, res = response) => {
    const { name, lastName, email, phone, company, birthday } = req.body;
    const gender = req.body.gender.toLowerCase();

    const createdBy = req.user._id;

    // Validate if email is unqiue or not
    const notUniqueEmail = await Contact.findOne({ email: email, createdBy: createdBy });

    if (notUniqueEmail) {
        return res.status(400).json({
            msg: `Email ${notUniqueEmail.email} is already register`
        });
    }

    // Verify if phone is unique or not
    if (phone !== '') {
        const notUniquePhone = await Contact.findOne({ phone: phone, createdBy: createdBy });
        if (notUniquePhone) {
            return res.status(400).json({
                msg: `Phone ${notUniquePhone.phone} is already register`
            });
        }
    }

    const data = {
        name,
        lastName,
        email,
        gender,
        phone,
        company,
        birthday,
        createdBy
    }

    const contact = new Contact(data);

    await contact.save();

    res.status(201).json({
        contact
    });
}

const putContact = async (req, res = response) => {
    const { id } = req.params;
    // const idFromUser = req.user._id;
    const { _id, date_added, ...rest } = req.body;


    const contact = await Contact.findByIdAndUpdate(id, rest, { new: true });

    res.json({
        id,
        contact
    });
}

const deleteContact = async (req, res = response) => {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    res.json(contact);
}

module.exports = {
    getContacts,
    postContact,
    getContactById,
    putContact,
    deleteContact
}