const express = require('express');
const router = express.Router();
const Member = require('../models/member');


router.post('/',async(req,res)=>{
  try{
    const {name} = req.body;
    const member = new Member({name});
    await member.save();
    res.status(201).json(member)
  }catch(err){
    console.log(err);
  }
});

router.get('/',async(req,res)=>{
  try{
    const members = await Member.find();
    res.json(members);
  }catch(err){
    console.log(err);
  }
})


module.exports = router;