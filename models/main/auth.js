module.exports = function(mongoose)
{
    var schema = new mongoose.Schema({
        database: String,
        username: String,
        password: String,
        domain: String
    }, { collection: 'auth'});

    return mongoose.model('auth', schema);
};
