const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    description:{
        type: String, 
        required: true
    }, 
    code:{
        type: String,
        required: true
    },
    cost:{
        type: String,
        required: true
    },
    image_url:{
        type: "String",
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', product);