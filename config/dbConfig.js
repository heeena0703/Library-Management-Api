const mongoose = require('mongoose');

// Replace with your actual connection details
const username = process.env.USER_ADMIN;
const password = process.env.USER_PASS;
const cluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME; // Your desired DB name

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;

const connectDB = async () => {
  mongoose.connect(uri)
.then(() => console.log(`✅ Connected to MongoDB Atlas database: ${dbName}`))
.catch(err => console.error('❌ MongoDB connection error:', err));
}


module.exports = connectDB;