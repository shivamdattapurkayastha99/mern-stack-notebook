const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser=require('../middleware/fetchUser');
const JWT_SECRET='shivamisagoodboy';
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
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
      res.json({ authtoken })
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Some Error Occured");

    }
    
})
router.post('/login',[
    body('email').isEmail(),
    
    body('password').exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const{email,body}=req.body;
    try {
        let user=await User.findOne({email});
        if (!user) {
            return res.status(400).json({"error":"User does not exist"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if (!passwordCompare) {
            return res.status(400).json({"error":"User does not exist"})
        }
        const payload={
            user: {
                id:user.id
            }

            
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken})
    } catch(error){
        console.error(error.message)
        res.status(500).send("Some Error Occured");

    }

});
router.post('/getuser',fetchUser,async(req,res)=>{
try {
    userId=req.user.id;

    const user=await User.findById(userId).select("-password")
    res.send(user)
} catch(error){
    console.error(error.message)
    res.status(500).send("Some Error Occured");

}
});
module.exports=router
