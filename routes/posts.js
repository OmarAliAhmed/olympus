const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const moment = require("moment");
const multer = require("multer");
const isAdmin = require("../config/isAdmin")
const passport = require("passport")


// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/posts-images')
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
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})
//Getting all posts by specific author
router.get("/authorposts/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.find({
        creatorId: req.params.id
    }, (err, data) => {
        if (err) return err;
        if (data.length > 0) {
            res.json({
                success: true,
                data
            })
        } else {
            res.json({
                success: true,
                data: "This user has no posts !"
            })
        }
    })
})

//Getting all recommended posts route
router.get("/recommended", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.find({
        status: true
    }, (err, data) => {
        if (err) return err;
        res.json(data)
    })
})


//Getting a specific post using id
router.get("/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) return err;
        if (!data) {
            res.json({
                success: false,
                msg: "not found"
            })
        } else {
            res.json({
                success: true,
                data
            })
        }
    })
})

//Getting a author using id
router.get("/author/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) return err;
        if (!data) {
            res.json({
                success: false,
                msg: "not found"
            })
        } else {
            res.json({
                success: true,
                data: data.creator
            })
        }
    })
})

//Getting all posts with a specific category
router.get("/category/:category", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.find({
        category: req.params.category
    }).sort('-date').exec((err, data) => {
        if (err) return err;

        if (!data) {
            res.json({
                success: false,
                msg: "not found"
            })
        }

    })
})
// Pending posts functionality

// Getting pending posts to be reviewd
router.get("/pendingposts", isAdmin(), passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.find({
        status: null
    }, (err, data) => {
        if (err) return err;
        if (!data) {
            res.json({
                success: false,
                msg: "not found"
            })
        } else {
            res.json({
                success: true,
                data
            })
        }
    })
})
//Posting a post by user to be reviewed
router.post("/posts", passport.authenticate('jwt', {
    session: false
}), upload.single("postImage"), (req, res) => {
    let newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        postImage: req.file.path,
        creatorId: req.user._id,
        creatorName: req.user.name,
        createdAt: moment().format("Do MMMM, YYYY"),
        category: req.body.category
    })

    newPost.save((err) => {
        if (err) return err;
        res.json({
            success: true,
            msg: "The post has been published successfully"
        })
    })
})

//Accepting or refusing a reviewed post
router.patch("/pendingposts/:id/:status", passport.authenticate('jwt', {
    session: false
}), isAdmin(), (req, res) => {
    Post.findByIdAndUpdate(req.params.id, {
        $set: {
            publishedAt: moment().format("Do MMMM, YYYY"),
            status: req.params.status
        }
    }, {}, (err) => {
        if (err) return err;
        res.json({
            success: true,
            msg: "The post has been recommended successfully"
        })
    })
})

//Refusing a reviewed post
router.delete("/pendingposts/:id", passport.authenticate('jwt', {
    session: false
}), isAdmin(), (req, res) => {
    Post.findByIdAndDelete(req.params.id, {}, (err) => {
        if (err) return err;
        res.json({
            success: true,
            msg: "The post has been deleted successfully"
        })


    })
})

module.exports = router