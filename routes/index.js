var express = require('express');
var session = require('express-session');
var router = express.Router();


var currentSession;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

		var user = { 	name : req.body.name,
						password: req.body.password,
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

router.delete('/users/:id', function(req,res,next){
	if(!req.query.id){
		var db = req.db;
		var collection = db.get("users");
		collection.remove({_id:req.params.id}, {}, function(err,numberOfRemovedDocs){
			res.send("removed " + numberOfRemovedDocs + " docs");
		})
	}else{
		res.send("Missing Parameter");
	}
});

router.post('/login', function(req,res,next){
	if(!req.body.email){
		// ERROR NO EMAIL
		res.send("Missing Parameter");
	}else if(!req.body.password){
		// ERROR NO PASSWORd
		res.send("Missing Parameter");
	}else{
		currentSession = req.session;
		currentSession.email = req.body.email;
		// Everything there
		var db = req.db;
		var collection = db.get("users");

		collection.findOne({email : req.body.email}, function(err, user){
			if(user.password == req.body.password){
				res.send("User logged in !");
			}else{
				res.send("Wrong Password");
			}
		});

	}
});

router.get('/logoff',function(req, res, next) {
	currentSession = undefined;
	res.send("user logged off");
});

router.get('/test/:url', function(req, res, next) {
	var path = req.params.url;
	var whateverValue;
	if(path.length < 2){
		whateverValue = "Chuck Norris is the reason why The Birds are angry";
	}else if(path.length < 3){
		whateverValue = "When Alexander Bell invented the telephone he had 3 missed calls from Chuck Norris";
	}else if(path.length < 4){
		whateverValue = "Chuck Norris died 20 years ago, Death just hasn't built up the courage to tell him yet.";
	}else if(path.length < 5){
		whateverValue = "Chuck Norris has already been to Mars; that's why there are no signs of life.";
	}else{
		whateverValue = "Chuck Norris counted to infinity - twice.";
	}
	res.render('testing', {title: "Page de test", url : path, whatever : whateverValue, brand:"CsGamesSherby", btn1:"Such Button", btn2:"that-bootstrap", btn3:"GG-NO-RE"})
	//res.send(req.params.url);
  //res.render('index', { title: 'Express' });
});



module.exports = router;
