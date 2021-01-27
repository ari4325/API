const express = require('express')
const Shop = require('../Db/Shop')
const Product = require('../Db/Product')
const router = express.Router()

router.post('/addShop', async (req, res) => {
    const shop = new Shop({
        shop_name: req.body.shop_name,
        shop_address: req.body.shop_address,
        products: []
    })

    await shop.save();
    res.status(200).send({"status":1 , "response": shop })
})

router.post('/addProduct', async (req, res) => {
    try{
        const shop = Shop.findOne({shop_name: req.body.shop_name})
        if(!shop) return res.status(400).send({ "status" : 0, "response" : "Shop has not been set up" });

        const product = Product.findOne({code:req.body.code})
        if(!product) return res.status(400).send({ "status" : 0, "response" : "Product Does Not Exist" });

        await Shop.findOneAndUpdate(
            {shop_name: req.body.shop_name}, 
            { $push: {
                products: product
            }})
    }catch (err){
        console.log(err)
    }
})

module.exports = router