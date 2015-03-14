var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var db = req.db;
	var collection = db.get("users");
	collection.find({},{},function(e,docs){
		console.log(docs);
		if(e){
			console.log(e);
		}
		res.write("userList");
		//res.render("users", {userlist: docs});
	});
});

router.post('/', function(req, res, next){
	// Parameter check

	if(!req.body.name){
		// ERROR NO NAME
		res.write("Missing Parameter");
	}else if(!req.body.email){
		// NO EMAIL
		res.write("Missing Parameter");
	}else if(!req.body.age){
		// NO NAME
		res.write("Missing Parameter");
	}else if(!req.body.sex){
		// NO SEX
		res.write("Missing Parameter");
	}else if(!req.body.interestedIn){
		// NO INTEREST
		res.write("Missing Parameter");
	}else if(!req.body.description){
		// NO DESCRIPTION
		res.write("Missing Parameter");
	}else{
		// Everything is there
		var db = req.db;
		var collection = db.get("users");

		var user = { 	name : req.body.name,
						email: req.body.email,
						age : req.body.age,
						sex : req.body.sex,
						interestedIn : req.body.name,
						description: req.body.description,
						tags: req.body.tags | "",
						profilePic: req.body.profilePic | ""
		};
		collection.insert(user);
		res.write("User inserted with success");
	}


});

module.exports = router;
