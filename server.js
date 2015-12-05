// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var db = require('./config/db');
mongoose.connect(db.url);

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

var Survey = require('./app/models/survey');

    // ROUTES FOR OUR API
    // =============================================================================

    // create our router
var router = express.Router();

    // middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

    // on routes that end in /bears
    // ----------------------------------------------------
router.route('/survey')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function (req, res) {
	    console.log('post is happening.',req.body);
	    var survey = new Survey();		// create a new instance of the Bear model
	    survey.address = req.body.address;
	    survey.lat = req.body.lat; // set the bears name (comes from the request)
	    survey.long = req.body.long;
	    survey.maxwater = req.body.maxwater;
	    survey.save(function (err) {
	        if (err)
	            res.send(err);

	        res.json({ message: 'Bear created!' });
	    });


	});
    router.route('/survey')

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function (req, res) {
	    Survey.find(function (err, survey) {
	        if (err)
	            res.send(err);

	        res.json(survey);
	    });
	});

    // on routes that end in /bears/:bear_id
    // ----------------------------------------------------
    router.route('/survey/:survey_id')

	// get the bear with that id
	.get(function (req, res) {
	    Survey.findById(req.params.survey_id, function (err, survey) {
	        if (err)
	            res.send(err);
	        res.json(survey);
	    });
	})

	// update the bear with this id
	.put(function (req, res) {
	    Survey.findById(req.params.survey_id, function (err, survey) {

	        if (err)
	            res.send(err);

	        survey.address = req.body.address;
	        survey.lat = req.body.lat; 
	        survey.long = req.body.long;
	        survey.maxwater = req.body.maxwater;
	        survey.save(function (err) {
	            if (err)
	                res.send(err);

	            res.json({ message: 'Bear updated!' });
	        });

	    });
	})

	// delete the bear with this id
	.delete(function (req, res) {
	    Survey.remove({
	        _id: req.params.survey_id
	    }, function (err, bear) {
	        if (err)
	            res.send(err);

	        res.json({ message: 'Successfully deleted' });
	    });
	});


    // REGISTER OUR ROUTES -------------------------------
app.use('/api', router);


// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app