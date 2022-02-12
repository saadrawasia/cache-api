var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/cache');

var Schema = mongoose.Schema;

var CacheSchema = new Schema({
    value: String,
    expires: Number,
});


var Cache = mongoose.model('Cache', CacheSchema);
module.exports = Cache;