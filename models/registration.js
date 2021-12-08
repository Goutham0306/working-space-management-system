const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    userpassword:{
        type:String,
        required:true
    },
    usercpassword:{
        type:String,
        required:true
    },
    useraddress:{
        type:String,
        required:true
    }
});

const Users = new mongoose.model("user",userSchema);
module.exports= Users;