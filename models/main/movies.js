module.exports = function()
{
    var mongoose = require('mongoose');

    return new mongoose.Schema({
        title: {
            type: String
        },
        rating: String,
        releaseYear: Number,
        hasCreditCookie: Boolean
    });
};
