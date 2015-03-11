var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:url', function(req, res, next) {
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
