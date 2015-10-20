const mongoose = require('mongoose');
const db = mongoose.connection;
const connections = {};

module.exports = function(database, model)
{
    if (!database || database.length == 0) {
        database = 'main-stack';
    }

    if (!model || model.length == 0) {
        model = 'movies';
    }

    var folders = {
        'main-stack': 'main'
    };

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

    return null;

};

/*
let Mongoose = require('Mongoose');
let db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log('Conectado ao MongoDB.')
    // Vamos adicionar nossos Esquemas, Modelos e consultas aqui

    var movieSchema = new Mongoose.Schema({
        title: { type: String },
        rating: String,
        releaseYear: Number,
        hasCreditCookie: Boolean
    });


    var Movie = Mongoose.model('Movie', movieSchema);


    for (var i =1; i<=3; i++){
        var thor = new Movie({
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

//Mongoose.connect('mongodb://localhost/test');
Mongoose.connect('mongodb://localhost/main-stack');
*/


