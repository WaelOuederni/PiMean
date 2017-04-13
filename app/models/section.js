/**
 * Created by WAEL on 13/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sectionSchema = new Schema({
    id : String,
    name : String
});

module.exports = mongoose.model('Section', sectionSchema);

