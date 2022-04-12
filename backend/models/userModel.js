const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name!"],
        trim: true

 },
 email: {
    type: String,
    required: [true, "Please enter the email!"],
    trim: true,
    unique: true
 },
 password: {
    type: String,
    required: [true, "Please enter the password!"],

 }
}, {timestamps: true})

module.exports = mongoose.model('Users', userSchema)







    
