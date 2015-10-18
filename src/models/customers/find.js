var bluebird = require('bluebird');
var _ = require('lodash');

module.exports = function find (store, id, query) {
    'use strict';

    return bluebird.resolve()
        .then(function()
        {
            var customers = [{}];

            return customers;
        });
};