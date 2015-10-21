const mongoose = require('mongoose');
const db = mongoose.connection;
const connections = {};

module.exports = function(database)
{
    if (!database || database.length == 0) {
        database = 'main-stack';
    }

    var folders = {
        'main-stack': 'main'
    };
    var modelFolder = folders.hasOwnProperty(database) ? folders[database] : 'sources';

    return require('mongoose.models.autoload')(require('mongoose'), require('path').join(__dirname, modelFolder), true).connect('mongodb://localhost/' + database);

    /*
    if (!connections.hasOwnProperty(database)) {
        db.once('open', function()
        {
            console.log(['Connected to mongo with database', database].join(' '));

            var modelFolder = folders.hasOwnProperty(database) ? folders[database] : 'sources';
            var defineSchema = require('./' + modelFolder  + '/' + model);
            var schema = new defineSchema;

            var mongooseSchema = mongoose.model(model, schema);
            for (var i =1; i<=3; i++){
                var thor = new mongooseSchema({
                    title: 'Thor ' + i,
                    rating: 'PG-13',
                    releaseYear: '2011',  // Note o uso de String ao inves de Number
                    hasCreditCookie: true
                });

                thor.save(function(err, thor) {
                    if (err) return console.error(err);
                    console.log('Salvo: ')
                    console.dir(thor);
                });
            }
        });

        mongoose.connect('mongodb://localhost/' + database);
    }
    */
};
