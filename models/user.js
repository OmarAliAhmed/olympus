const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minLength: 4,
        required: true,
        lowercase: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    bio: {
        type: String,
        required: true
    },
    profileImage: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});
userSchema.statics.addUser = (user, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash)=> {
                user.password = hash;
                user.save(callback);
            })
        })
    }
    
userSchema.statics.comparePassword = (enteredPassword, hashedPassword, callback) => {
    bcrypt.compare(enteredPassword, hashedPassword, (err, isMatch) => {
        if(err) {
            throw err;
        } else {
            callback(null, isMatch)
        }
    })
}
userSchema.statics.findUserById = (id, callback) => {
    User.findById(id, (err, user) => {
        if(err) {
            callback(err, false)
        }
        if(!user) {
            callback(null, false)
        } else {
            callback(null, user)
        }
    })
}
var User = mongoose.model("User", userSchema);

module.exports = User;
