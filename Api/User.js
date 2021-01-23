const { query } = require('express')
const express = require('express')
const User = require('../Db/User')
const router = express.Router()
const bcryptjs = require('bcryptjs')


//Sign up users
router.post('/signup', async (req, res) => {
    try{
        const email = await User.findOne({ email_id : req.body.email_id });
        if (email) return res.status(400).send({"status":0, "response": "Email Id already taken!"});

        const mobile = await User.findOne({ mobile_no : req.body.mobile_no });
        if (mobile) return res.status(400).send({"status":0, "response": "Mobile No. already taken!"});


        const salt = await bcryptjs.genSalt(10)
        const hashPass = await bcryptjs.hash(req.body.password, salt)

        const user = new User({
            username: req.body.username,
            email_id: req.body.email_id,
            password: hashPass,
            mobile_no: req.body.mobile_no
        })

        await user.save();
        res.status(200).json({"status":1, "response": user._id });
    }catch(err){
        res.status(400).send({"status":0, "response": err})
    }
})

//login users
router.get('/login', async (req, res) => {
    try{
        const user = await User.findOne({ email_id : req.body.email_id });
        if (!user) return res.status(404).send({"status":0, "response": "Email Id could not be found"});

        const validatePass = await bcryptjs.compare(req.body.password, user.password);
        if (!validatePass) return res.status(404).send({"status":0, "response": "Password is wrong. Please Try Again"});

        res.status(200).send({"status":1 , "response": user })
    }catch (err) {
        res.status(400).send({"status":0, "response": err})
    }
})

module.exports = router