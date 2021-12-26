const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.contactsPath = '/api/contacts';

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.contactsPath, require('../routes/contacts.routes'));
        this.app.use(this.usersPath, require('../routes/users.routes'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Contacts Server is running at port', this.port);
        });
    }
}

module.exports = Server;