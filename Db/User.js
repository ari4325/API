const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username: {
        type:String, 
        required: true
    }, 
    email_id:{
        type:String,
        required:true
    }, 
    password: {
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    }
});

module.exports = mongoose.model('user', user)