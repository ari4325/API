const express = require('express')
const Shop = require('../Db/Shop')
const router = express.Router()

router.post('addShop', async (req, res) => {
    const valid_shop = Shop.findOne({shop_name: req.body.shop_name})
    if(valid_shop) return res.status(400).send({ "status" : 0, "response" : "Shop has already been set up" });

    const shop = new Shop({
        shop_name: req.body.shop_name,
        shop_address: req.body.shop_address,
        products: []
    })

    await shop.save();
    res.status(200).send({"status":1 , "response": shop })
})

router.post('addProduct', async (req, res) => {
    const shop = Shop.findOne({shop_name: req.body.shop_name})
    if(!shop) return res.status(400).send({ "status" : 0, "response" : "Shop has not been set up" });


})

module.exports = router