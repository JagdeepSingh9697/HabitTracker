const mongoose = require('mongoose');
// create a user schema, the userSchema consist of the name, email, passowrd and timestamp for users login. 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("User" , userSchema);
module.exports = User;