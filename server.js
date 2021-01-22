const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./Db/Connection')
const app = express()
const port = process.env.Port || 4000;
const user_route = require('./Api/User')

connectDB()

app.use(express.json( {extended:true} ));
app.use('/api', user_route);
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

