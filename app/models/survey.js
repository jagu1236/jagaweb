var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SurveySchema = new Schema({
    address: String,
    lat: String,
    long: String,
    maxwater: String
});

module.exports = mongoose.model('Survey', SurveySchema);