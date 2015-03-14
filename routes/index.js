var express = require('express');
var session = require('express-session');
var router = express.Router();
var passGenerator = require('password-hash');

var currentSession;
/* GET home page. */
router.get('/', function(req, res, next) {
	if(currentSession && currentSession.email){
		res.redirect("/profile");
	}else{
		res.redirect("/login");
	}
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res, next) {
	if(currentSession && currentSession.email){
		res.send("Profile Page");
	}else{
		res.redirect("/login");
	}
});

router.get('/users', function(req, res, next) {
	if(currentSession && currentSession.email){
		console.log("allo");
		// User is logged in
		res.send("user logged in !");
	}else{

		var db = req.db;
		var collection = db.get("users");
		collection.find({},{},function(e,docs){
			console.log(docs);
			if(e){
				console.log(e);
			}
			res.send("userList");
			//res.render("users", {userlist: docs});
		});
	}
});

router.post('/users', function(req, res, next){
	// Parameter check

	if(!req.body.name){
		// ERROR NO NAME
		res.send("Missing Parameter");
	}else if(!req.body.username){
		// ERROR NO PASSWORD
		res.send("Missing Parameter");
	}else if(!req.body.password){
		// ERROR NO PASSWORD
		res.send("Missing Parameter");
	}else if(!req.body.email){
		// NO EMAIL
		// TODO : Ensure can't create duplicated emails
		res.send("Missing Parameter");
	}else if(!req.body.age){
		// NO NAME
		res.send("Missing Parameter");
	}else if(!req.body.sex){
		// NO SEX
		res.send("Missing Parameter");
	}else if(!req.body.interestedIn){
		// NO INTEREST
		res.send("Missing Parameter");
	}else if(!req.body.description){
		// NO DESCRIPTION
		res.send("Missing Parameter");
	}else{
		// Everything is there
		var db = req.db;
		var collection = db.get("users");

		var user = { 	username : req.body.username,
						name : req.body.name,
						password: passGenerator.generate(req.body.password),
						email: req.body.email,
						age : req.body.age,
						sex : req.body.sex,
						interestedIn : req.body.name,
						description: req.body.description,
						tags: req.body.tags | "",
						profilePic: req.body.profilePic | ""
		};
		collection.insert(user);
		res.send("User inserted with success");
	}
});

router.delete('/users/:username', function(req,res,next){
	// NEED SECURITY ON THIS... Ain't nobody got time for that
	if(!req.query.username){
		var db = req.db;
		var collection = db.get("users");
		collection.remove({usename:req.query.username}, {}, function(err,numberOfRemovedDocs){
			res.send("removed " + numberOfRemovedDocs + " users");
		})
	}else{
		res.send("Missing Parameter");
	}
});

router.get('/login', function(req,res,next){
	res.send("login page");
});

router.post('/login', function(req,res,next){
	if(!req.body.username){
		// ERROR NO EMAIL
		res.send("Missing Parameter");
	}else if(!req.body.password){
		// ERROR NO PASSWORd
		res.send("Missing Parameter");
	}else{
		currentSession = req.session;
		currentSession.username = req.body.username;
		// Everything there
		var db = req.db;
		var collection = db.get("users");

		collection.findOne({username : req.body.username}, function(err, user){
			if(user){
				if(passGenerator.verify(req.body.password, user.password)){
					res.send("User logged in !");
				}else{
					res.send("Wrong Password");
				}
			}else{
				res.send("User '"+req.body.username+"' Not Found");
			}
		});

	}
});

router.get('/logoff',function(req, res, next) {
	currentSession = undefined;
	res.send("user logged off");
});

module.exports = router;
