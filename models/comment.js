const mongoose = require("mongoose");
const comment = require("./comment");
const user = require("./registration");
const commentSchema =  mongoose.Schema({
    text: {
        type:String
    },
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});
const Comment= new mongoose.model("comment",commentSchema);
module.exports = Comment;