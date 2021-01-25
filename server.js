const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./Db/Connection')
const app = express()
const port = process.env.Port || 8080;
const user_route = require('./Api/User')
const product_route = require('./Api/Product')
const shop_route = require('./Api/Shop')

connectDB()

app.use(express.json( {extended:true} ));
app.use('/user', user_route);
app.use('/product', product_route);
app.use('/shop', shop_route);

app.get('/', (req, res) => {
    res.send("Welcome to Scan And Pay")
});


app.listen(port, (err) => {
    if(err == null){
        console.log("Started...");
    }else{
        console.log( { message:err } );
    }
})

