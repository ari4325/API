const mongoose = require('mongoose');
const URI = "mongodb+srv://user_1:arighosh4325@cluster0.pa17a.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("DB Connected...");
};

module.exports = connectDB;