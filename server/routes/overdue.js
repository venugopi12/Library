const express = require('express');
const router = express.Router();
const Member = require('../models/member');
const Circulation = require('../models/circulation');


router.get('/overdue/:memberId', async (req, res) => {
  const { memberId } = req.params;

  try {
    const member = await Member.findById(memberId);
    if(!memberId){
      return res.status(404).json({message:"Member not Found"})
    }

    const overdueCirculations = await Circulation.find({
      member:memberId,
      eventType:'checkout',
      returnDate : {$lt: new Date()}
    })

    const totalFines = 0;
    const overdueBooks = overdueCirculations.map(circulation =>{
      const daysOverDue = Math.max(0,Math.ceil((new Date() - circulation.returnDate)/(1000 *60 *60 *24))-7);
      const fiene = daysOverdue * 50;
      totalFines +=fine;

      return {
        book:circulation.book,
        fine
      };
    });

    res.status(200).json({member,overdueBooks,totalFines});
  } catch (err) {
    console.log(error);
    res.status(500).json({message:"Internal server Error"})
  }
});


module.exports = router;