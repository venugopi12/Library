const express = require('express');
const router = express.Router();
const Book = require('../models/books');
const Member = require('../models/member');
const Circulation = require('../models/circulation');

router.get('/' ,async(req,res)=>{
  try{
    const books= await Book.find();
    res.json(books)
  }catch(err){
    console.log(err)
  }
});

router.post('/checkout', async (req, res) => {
  const { bookId, memberId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book || book.copies <= 0) {
      return res.status(404).json({ message: "Book not available for checkout" });
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const circulation = new Circulation({
      book: bookId,
      member: memberId,
      eventType: 'checkout',
      checkoutDate: new Date()
    });
    await circulation.save();


    book.copies--;
    await book.save();

    res.status(200).json({ message: "Book checkoout successfully" })

  }
  catch (err) {
    console.log(err)
    res.status(500).json({message:"Internal server error"});
  }
})


router.post('/return', async (req, res) => {
  const { circulationId } = req.body;

  try {

    const circulation = await Circulation.findById(circulationId);
    if(!circulation || circulation.eventType !== 'checkout'){
      return res.status(404).json({message:"Invaid circulation Entry"});
    }

    circulation.eventType = 'return';
    circulation.returnDate = new Date();
    await circulation.save();

    const book = await Book.findById(circulation.book);
    if (book) {
      book.copies ++;
      await book.save();
    }
    res.status(200).json({message:"Book returned successfully"})

  }
  catch (err) {
    console.log(err)
  }
});


module.exports = router;
