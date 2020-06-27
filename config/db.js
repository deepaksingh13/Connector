const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async() =>{
    try {        
        await mongoose.connect(db,{ useNewUrlParser : true, useCreateIndex : true, useFindAndModify : false,useUnifiedTopology :true });
        console.log('Database Connected');
    } catch (err) {
        console.error(err);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;