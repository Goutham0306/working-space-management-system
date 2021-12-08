const express = require("express");
const { rsort } = require("semver");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Home Page");
});

router.get("/signup",(req,res)=>{
    res.send("This is Signup page");
});

module.exports = router;