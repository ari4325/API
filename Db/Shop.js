const mongoose = require('mongoose')

const product = new mongoose.Schema({
    code:{
        type:String,
        required: true
    }, 
    quantity:{
        type: Number,
        required: true
    }
})

const shop = new mongoose.Schema({
    shop_name:{
        type: String, 
        required: true
    },
    shop_address:{
        type: String, 
        required: true
    }, 
    products:[product]
})

module.exports = mongoose.model("shop", shop)