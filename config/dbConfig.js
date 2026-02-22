const mongoose = require('mongoose');


const connectDB = async ()=>{
  await mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
}

module.exports = connectDB;