const mongoose = require('mongoose')

const user = new mongoose.Schema({
    mobile_no:{
        type: String,
        required: true
    },
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