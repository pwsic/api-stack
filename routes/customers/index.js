"use strict";

var Express = require('express');
var Router = Express.Router();
var find = require('../../src/models/customers/find');
var logError = require('debug')('route-orders-index:error');
var _ = require('lodash');

Router.get('/', doGet);
Router.get('/:id(\\d+)/', doGet);

function doGet (req, res) {
    _.extend(req.query, {
        page: req.query.page || 0,
        size: req.query.size || 30
    });

    find(req.store, req.params.id, req.query)
        .then(function (data) {
            if (!data || data.total === 0) {
                res.status(404).send(data).end();
            } else {
                res.status(200).send(data).end();
            }
        })
        .catch(function (error) {
            logError(error);
            var httpCode = error.httpCode || 500;
            delete error.httpCode;

            res.status(httpCode).send(error).end();
        });
}

module.exports = Router;