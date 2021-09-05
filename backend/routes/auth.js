const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET='shivamisagoodboy';
router.post('/',[
    body('email').isEMail(),
    body('name').isLength({ min: 3 }),
],async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user=await User.findOne({email:req.body.email})
    if (user) {
        return res.status(400).json({error :"Sorry a user with this email already exists"})
    }
    const salt=await bcrypt.genSalt(10);

    const secPass=await bcrypt.hash(req.body.password,salt)
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password:secPass,
      })
      const data={
          user:{
              id:user.id 
          }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      console.log(authtoken);
      res.json((authtoken))
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Some Error Occured");

    }
})
module.exports=router
