const express = require("express");
const User = require("../models/user");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const config = require("../config/config")
const router = express.Router();
const _ = require("lodash");
const passport = require("passport");


// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users-images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + file.mimetype.replace("image\/", "."))
    }

})
const fileFilter = function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true)
    } else {
        cb(new Error("Please do upload an image !"), false)
    }
}
var upload = multer({
    storage, limits: {
        fileSize: 1024 * 1024 * 5
    }, fileFilter
})

// Getting data about specific user using username
router.get("/username/:username",passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const username = req.params.username;
    User.findOne({
        username
    }, (err, user) => {
        if (err) return err;
        if (!user) {
            res.json({
                success: "false",
                msg: "There's no such user"
            })
        } else {
             console.log(req.user)
            res.json({
                success: "true",
                user : _.omit(user, ['password'])
            })
        }
    })
})

// Getting data about specific user using id
router.get("/id/:id",passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) return err;
        if (!user) {
            res.json({
                success: "false",
                msg: "There's no such user"
            })
        } else {
             console.log(req.user)
            res.json({
                success: "true",
                user : _.omit(user, ['password'])
            })
        }
    })
})

// Registering a user
router.post("/register", upload.single("profileImage"), (req, res) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        bio: req.body.bio,
        profileImage: req.file.path
    })
console.log(req.body)
    User.addUser(newUser, (err) => {
        if (err) return err;
        res.send({
            success: "true",
            msg: "You've singed up successfully"
        })
    })
})


//Authentication
router.post("/login", (req, res) => {
    let userCredentials = {
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({
            username: userCredentials.username
        }, (err, user) => {
            if (err) return err;
            if (!user) {
                return res.json({
                    success: false,
                    msg: "There's no such user"
                })
            }
            User.comparePassword(userCredentials.password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800
                    })
                    return res.json({
                        token: "JWT " + token,
                        user: _.omit(user, ['password', 'email']),
                        success: true

                    })
                } else {
                    return res.json({
                        success: false,
                        msg: "The password is written incorrectly"
                    })
                }
            })
        })
    })
module.exports = router;
