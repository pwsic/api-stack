'use strict';

const singleton = Symbol(),
    singletonEnforcer = Symbol();

class Utils {
    constructor(inject, enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error("Cannot construct singleton");
        }

        this.auth = require('./auth').do.bind(null, inject.authorizer);
    }

    static instance(inject) {
        inject = inject || require('./inject');
        if (!this[singleton]) {
            this[singleton] = new Utils(inject, singletonEnforcer);
        }
        return this[singleton];
    }
}

module.exports = Utils;
