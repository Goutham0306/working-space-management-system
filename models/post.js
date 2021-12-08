const mongoose = require("mongoose");
const comment = require("./comment");
const user = require("./registration");
const uploadSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    createdAt: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

const Imageschema = new mongoose.model("imageupload",uploadSchema);
module.exports = Imageschema;