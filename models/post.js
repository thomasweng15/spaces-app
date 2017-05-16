var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    title: String,
    url: String
});

module.exports = mongoose.model('Post', Post);