const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  MemberID : {
      type:Number,
      required :true
    },
    MemberName : {
      type:String,
      required :true
    }
})


const Member = mongoose.model('Member',memberSchema);

module.exports = Member;