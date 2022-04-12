const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the title!"],
        trim: true

 },
 desc: {
    type: String,
    required: [true, "Please enter the desc!"],
    trim: true,

 },
 status: {
    type: Boolean,
    default: true
    
 },

 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"

 }
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema)
