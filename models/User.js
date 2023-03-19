const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 50,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
    
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minLength: 6
  },
})

// Before create a user
UserSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// mongoose:- Instance methods
// Now all of our UserSchema instances have a createJtw method available to them.
UserSchema.methods.createJWT = function () {
  const token = jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn: "30d"})
  return token

}

// mongoose:- Instance methods
// Compare password 
UserSchema.methods.comparePass = async function(candidatePassword){ 
  const decode = await bcrypt.compare(candidatePassword, this.password)
  return decode
}
const User = mongoose.model('User', UserSchema)
module.exports = User;
