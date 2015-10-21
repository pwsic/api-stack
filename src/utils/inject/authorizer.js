'use strict';

function authorizer(auth) {
    let authData = null;
    let authObject = null;
    const db = require('api-stack/models/connection')();

    try {
        authData = new Buffer(auth, 'base64').toString('utf8');
        authObject = JSON.parse(authData);
    } catch (err) {}

    return Promise.resolve().then(function () {
        if (!authObject ||
            !(authObject instanceof Object) ||
            !authObject.hasOwnProperty('username') ||
            !authObject.hasOwnProperty('password') ||
            !authObject.hasOwnProperty('domain')
        ) {
            throw new Error("Invalid authorization header");
        }

        return db.model('auth').findOne(authObject);
    }).then(function (user) {
        if (!user) {
            throw new Error("This user doesnt exist");
        }

        return Promise.resolve({
            _id: user._id,
            database: user.database,
            domain: user.domain
        });
    });
}

module.exports = authorizer;