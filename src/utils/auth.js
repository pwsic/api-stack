'use strict';

class Auth {
    static do(authorizer, req, res, next) {
        let auth = req.headers.authorization;

        return Promise.resolve().then(function () {
            if (!auth || typeof auth !== "string" || auth.length === 0) {
                throw new Error("Missing authorization header");
            }

            return authorizer(auth);
        }).then(function (user) {
            req.user = user;
            next();
        }).catch(function (error) {
            res.status(error.code || 401);
            res.json({
                message: error.message,
                id: error.id,
                code: error.code || 401,
                type: error.type
            });
            res.end();
        });
    }
}

module.exports = Auth;