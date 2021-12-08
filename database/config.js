const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to DB');
    }catch(error){
        throw new Error('There is a error connecting to database');
    }
}


module.exports = {
    dbConnection
}