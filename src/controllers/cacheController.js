'use strict';

const cacheRepository = require('../repositories/cacheRepository');

exports.get = (req, res) => {
    cacheRepository.getAll()
        .then((cache) => {
            res.status(200).send(cache);
        }).catch(err => res.status(500).send(err))
};

exports.getById = (req, res) => {
    const _id = req.params.id;

    cacheRepository.getById(_id)
        .then((cache) => {
            res.status(200).send(cache);
        }).catch(err => res.status(500).send(err))
};

exports.post = (req, res) => {
    const body = req.body;

    cacheRepository.create(body)
        .then((cache) => {
            res.status(200).send(cache);
        }).catch(err => res.status(500).send(err))
};

exports.put = (req, res) => {
    const _id = req.params.id;
    const body = req.body;

    cacheRepository.update(_id, body)
        .then((cache) => {
            res.status(201).send(cache);
        }).catch(err => res.status(500).send(err))
};

exports.delete = (req, res) => {
    cacheRepository.delete(req.params.id)
        .then(() => {
            res.status(200).send('Cache Removed');
        }).catch(err => console.error.bind(console, `Error ${err}`))
};