const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookID : {
      type:Number,
      required :true
    },
    BookName : {
      type:String,
      required :true
    },
    NumberOfCopies : {
      type:Number,
      required :true
    }
})


const Book = mongoose.model('Book',bookSchema);

module.exports = Book;