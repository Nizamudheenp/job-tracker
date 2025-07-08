const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        if(db){
            console.log('db connection success');    
        }
    } catch (error) {
        console.error(error);      
    }
}

module.exports = connectDB;