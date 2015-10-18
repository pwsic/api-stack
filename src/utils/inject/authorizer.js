'use strict';

function authorizer(auth) {
    let authData = null;
    let authObject = null;

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

        throw new Error("Nothing to do here");
    }).then(function (user) {
        if (!user) {
            throw new Error("This user doesnt exist");
        }

        return Promise.resolve({
            id: user.id,
            database: user.database,
            domain: user.domain
        });
    });
}

module.exports = authorizer;