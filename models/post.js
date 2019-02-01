const moment = require("moment"),
    mongoose = require("mongoose");


var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postImage: {
        type: String
    },
    creatorId: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    publishedAt: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: null
    },
    category: {
        type: String,
        required: true,
        lowercase: true
    },
    creatorName: {
        type: String,
        required: true,
        
    }
    
})

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
