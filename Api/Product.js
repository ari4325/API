const express = require('express')
const Product = require('../Db/Product')
const router = express.Router()

router.post('/registerProduct', async (req, res) => {
    try{
        const code = await Product.findOne({ code : req.body.code });
        if (code) return res.status(400).send({ "status" : 0, "response" : "Product ALready Exists" });

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            quantity: req.body.quantity,
            cost: req.body.cost,
            image_url: req.body.image_url
        });

        await product.save();
        res.send(200).send({"staus":0, "response": product });
    }catch (err){
        res.status(400).send({"status":0, "response": err})
    }
})