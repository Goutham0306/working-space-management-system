
const express = require("express").Router({ mergeParams: true });
const route = express;
const bodyparser = require("body-parser");
const fs = require("fs");
const path = require("path");
const flash = require("req-flash");
const ImageSchema = require("../models/post");
const uploads = require("../middleware/multer");
const Imageschema = require("../models/post");
const Comment = require("../models/comment");
const users = require("../models/registration");

//console.log("hello");
const jsonParser = bodyparser.json();

route.use(bodyparser.urlencoded({extended:false}));
const file_path = path.join(__dirname,"../uploads/");
route.post("/Posts",uploads.single('image'),(req,res,next)=>{
    var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(file_path + req.file.filename)),
			contentType: 'image/png'
		}
	}
	ImageSchema.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/Posts');
		}
	});
})

route.get("/Posts",(req,res)=>{
    res.render("Post");
})

route.get('/ViewAll', (req, res) => {
    ImageSchema.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
           // res.send(items);
            //console.log(items);

            res.render("AllPosts",{items:items});
        }
    });
});
route.get("/ViewAll",(req,res)=>{
    res.render("AllPosts");
});
// route.get("/image:id/coment",(req,res)=>{
// 	res.send("hello");
// })

route.get("/image:id",(req,res)=>{
	ImageSchema.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
		if (err) {
			console.log(err);
		}
		else {
			// render show template with that campground
			const template_path = path.join(__dirname,"../templates/views/Show");
			console.log(template_path);
			res.render(template_path, { images: foundCampground });
		}
	});
})
const template_path = path.join(__dirname,"../templates");
			console.log(template_path);

route.get("/images:id/comment/new",(req,res)=>{
	ImageSchema.findById(req.params.id, function (err, foundresults) {
		if (err) {
			console.log(err);
		}
		else {
			res.render("comments/new", { foundComment: foundresults });
		}
	});
});
route.post("/comments/new",(req,res)=>{
//	console.log(JSON.stringify(req.body));
	//const usercomment = JSON.stringify(req.body.usercomment);
	ImageSchema.findById(req.params.id, function (err, campground) {
		if (err) {
			console.log(err);
			res.redirect("/image:id");
		}
		else {
			// create new comment
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					res.send("something went wrong");
					console.log(err);
				}
				else {
					// add username and id to comment
					comment.author.id = req.user.id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					// connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					// redirect to campground show route
					req.flash("success", "Successfully added a comment.");
					res.redirect("/image:id/" + campground._id);
				}
			});
		}
	});
	
});
	


module.exports = route;