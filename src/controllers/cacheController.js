'use strict';
const { ttl } = require('../config/opts');
const cacheService = require('../services/cacheService');

/*
* return all cache items as response
*/

exports.get = async (req, res) => {
    try{
        const allCache = await cacheService.get();
        res.status(200).send(allCache);
    }catch(e){
        es.status(500).send(e)
    }
};

/*
* return cache item based on id and return as response
* if no item found create new item with random string and return as response
*/

exports.getById = async(req, res) => {
    const _id = req.params.id;
    try{
        const cache = await cacheService.getById(_id);
        if(cache){
            console.log("Cache hit")
            const updatedCache = await cacheService.update(_id,{value:cache.value})
            return res.status(200).send(updatedCache);
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

/*
* create cache item and return as response
*/

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

/*
* update cache item and return as response
*/
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

/*
* delete cache item
*/

exports.delete = async(req, res) => {
    try{
        await cacheService.delete(req.params.id);
        res.status(200).send('Cache Removed');
    }catch(e){
        console.error.bind(console, `Error ${e}`)
    }
};

/*
* delete cache item
*/

exports.deleteAll = async(req, res) => {
    try{
        await cacheService.deleteAll();
        res.status(200).send('All Cache Removed');
    }catch(e){
        console.error.bind(console, `Error ${e}`)
    }
};