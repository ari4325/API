const { query } = require('express')
const express = require('express')
const User = require('../Db/User')
const router = express.Router()


//Sign up users
router.post('/signup', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email_id: req.body.email_id,
        password: req.body.password
    })

    try{
        const query = { email_id: user.email_id }
        await User.findOne(query, (err, result) => {
            if (result == null){
                const registeredUser = user.save()
                res.status(200).json({"status":1, "response": user })
            }else{
                res.status(400).send({"status":0, "response": "User Already Exists"})
            }
        })
    }catch (err) {
        console.log({message:err})
        res.status(500).send({"status":0, "response": "There was some error. Check console for more info"});
    }
})

//login users
router.get('/login', async (req, res) => {
    try{
        const query = { email_id:req.body.email_id, password:req.body.password}
        User.findOne(query, (err, result) => {
            if (result != null){
                res.status(200).send({"status":1 , "response": result })
            }else{
                res.status(404).send({"status":0, "response": "User not found"})
            }
        })
    }catch (err) {
        res.status(400).send({"status":0, "response": err})
    }
})

module.exports = router