'use strict';

const { ttl } = require('../config/opts');
const cacheRepository = require('../repositories/cacheRepository');

exports.get = async (req, res) => {
    try{
        const allCache = await cacheRepository.getAll();
        res.status(200).send(allCache);
    }catch(e){
        es.status(500).send(e)
    }
};

exports.getById = async(req, res) => {
    const _id = req.params.id;
    try{
        const cache = await  cacheRepository.getById(_id)
        res.status(200).send(cache);
    }catch(e){
        res.status(500).send(e)
    }
};

exports.post = async(req, res) => {
    const body = req.body;
    const cache = {
        value: body.value,
        expires: Date.now() + ttl,
    }
    try{
       const createdCache =  await cacheRepository.create(cache);
       res.status(200).send(createdCache);
    }catch(e){
        res.status(500).send(e)
    }
    
};

exports.put = async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try{
        const updatedCache = await cacheRepository.update(_id, body);
        res.status(201).send(updatedCache);
    }catch(e){
        res.status(500).send(e)
    }
};

exports.delete = async(req, res) => {
    try{
        await cacheRepository.delete(req.params.id);
        res.status(200).send('Cache Removed');
    }catch(e){
        console.error.bind(console, `Error ${e}`)
    }
};