'use strict';
const { ttl } = require('../config/opts');
const cacheService = require('../services/cacheService');

exports.get = async (req, res) => {
    try{
        const allCache = await cacheService.get();
        res.status(200).send(allCache);
    }catch(e){
        es.status(500).send(e)
    }
};

exports.getById = async(req, res) => {
    const _id = req.params.id;
    try{
        const cache = await cacheService.getById(_id);
        if(cache){
            console.log("Cache hit")
            res.status(200).send(cache);
        }
        console.log("Cache miss");
        const randomString = (Math.random() + 1).toString(36).substring(7);
        const _cache = {
            _id: _id,
            value: randomString,
            expires: Date.now() + ttl,
        }
        try{
            const createdCache =  await cacheService.create(_cache);
            res.status(200).send(createdCache);
         }catch(e){
             res.status(500).send(e)
         }

        
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
       const createdCache =  await cacheService.create(cache);
       res.status(200).send(createdCache);
    }catch(e){
        res.status(500).send(e)
    }
    
};

exports.put = async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try{
        const updatedCache = await cacheService.update(_id, body);
        res.status(201).send(updatedCache);
    }catch(e){
        res.status(500).send(e)
    }
};

exports.delete = async(req, res) => {
    try{
        await cacheService.delete(req.params.id);
        res.status(200).send('Cache Removed');
    }catch(e){
        console.error.bind(console, `Error ${e}`)
    }
};

exports.deleteAll = async(req, res) => {
    try{
        await cacheService.deleteAll();
        res.status(200).send('All Cache Removed');
    }catch(e){
        console.error.bind(console, `Error ${e}`)
    }
};