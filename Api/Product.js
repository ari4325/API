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
            cost: req.body.cost,
            image_url: req.body.image_url
        });

        await product.save();
        res.status(200).send({"status":1 , "response": product })
    }catch (err){
        res.status(400).send({"status":0 , "response": err })
    }
})

router.get('/getProductByCode', async (req, res) => {
    const pr = await Product.findOne({code: req.body.code});
    if (!pr) return res.status(400).send({"status":0 , "response": "Product Not Found" })

    res.status(200).send({"status":1 , "response": pr })
});

router.get('/getProducts', async (req, res) => {
    const pr = await Product.findOne({shop_name: req.body.shop_name});
    if (!pr) return res.status(400).send({"status":0 , "response": "Shop not found !!!" })

    res.status(200).send({"status":1 , "response": pr })
})

module.exports = router