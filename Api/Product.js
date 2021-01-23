const express = require('express')
const Product = require('../Db/Product')
const router = express.Router()

router.post('/registerProduct', async (req, res) => {
    try{
        const code = await Product.findOne({ code : req.body.code });
        if (code) return res.status(400).send({ "status" : 0, "response" : "Product Already Exists" });

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            quantity: req.body.quantity,
            cost: req.body.cost,
            image_url: req.body.image_url
        });

        await product.save();
        res.send(200).json({ "status" : 1, "response" : product });
    }catch (err){
        res.status(400).send({"status": 0 , "response": err})
    }
})

router.get('/getProductById', async (req, res) => {
    const product = await Product.findOne( {code: req.body.code} );
    if (product) res.send(200).json({ "status" : 1, "response" : product._id });
    else res.send(400).send({ "status" : 0, "response" : "Product not found" });
});

module.exports = router