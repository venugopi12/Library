const express = require('express');
const router = express.Router();
const Circulation = require('../models/circulation');


router.post('/',async(req,res)=>{
  try{
    const {bookId,memberId,eventType,checkoutDate,returnDate} = req.body;
    const circulation = new Circulation({bookId,memberId,eventType,checkoutDate,returnDate});
    await circulation.save();
    res.status(201).json(circulation)
  }catch(err){
    console.log(err);
  }
});

router.get('/',async(req,res)=>{
  try{
    const circulation = await Circulation.find();
    res.json(circulation);
  }catch(err){
    console.log(err);
  }
})


module.exports = router;