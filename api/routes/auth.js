const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

//REGISTER
router.post("/register", async (req, res) =>{
  try {
    //encrypt password for security reasons
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password:hashedPass
    });

    const user = await newUser.save();
    res.status(200).json(user)


  } catch (error) {
    res.status(500).json(error)
  }
})
//LOGIN

router.post("/login", async (req,res) => {
  try {
    //retrieve user from db with the email
    const user = await User.findOne({email:req.body.email});
    !user && res.status(400).json("Wrong credentials!");

    //check if password matches
    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(400).json("Wrong credentials!");

    //use ._doc to get the user properties not the object with 2000 properties 
    const {password, ...others} = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = router