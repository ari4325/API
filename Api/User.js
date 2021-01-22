const { query } = require('express')
const express = require('express')
const User = require('../Db/User')
const router = express.Router()
const bcryptjs = require('bcryptjs')


//Sign up users
router.post('/signup', async (req, res) => {
    const salt = await bcryptjs.genSalt(10)
    const hashPass = await bcryptjs.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        email_id: req.body.email_id,
        password: hashPass,
        mobile_no: req.body.mobile_no
    })

    try{
        const query = { email_id: user.email_id, mobile_no: user.mobile_no }
        await User.findOne(query, (err, result) => {
            if (result == null){
                const registeredUser = user.save()
                res.status(200).json({"status":1, "response": user._id })
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
        /*const query = { email_id:req.body.email_id, password:req.body.password}
        User.findOne(query, (err, result) => {
            if (result != null){
                res.status(200).send({"status":1 , "response": result })
            }else{
                res.status(404).send({"status":0, "response": "User not found"})
            }
        })*/
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