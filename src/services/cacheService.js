'use strict';

const { cacheSize } = require('../config/opts');
const cacheRepository = require('../repositories/cacheRepository');

/*
* Get cache item which is the oldest
*/

const getOldestCacheItem = async()=>{
    const getAllCache = await this.get();
    getAllCache.sort(function(a, b) {
        return a.expires - b.expires;
      });
    return getAllCache[0];  
}

/*
* return all cacheItems from repository
*/
exports.get = async() =>{
    return await cacheRepository.getAll();
}

/*
* return cacheItem by id from repository
*/
exports.getById = async(id) => {
    return await cacheRepository.getById(id);
}

/*
* create cache item is cache is not full
* if cache is full get the oldest cache item and update it
*/

exports.create = async(cache)=>{
   const getAllCache = await this.get();
   if(getAllCache.length < cacheSize){
        return await cacheRepository.create(cache);
   }
   var item = await getOldestCacheItem();
   item.value = cache.value;
   return await cacheRepository.update(item.id , item);
}

/*
* update and return cacheItem from repository
*/
exports.update = async(id, body)=>{
    return await cacheRepository.update(id, body);
}

/*
* delete cacheItem by id from repository
*/
exports.delete = async(id) => {
    await cacheRepository.delete(id);
}

/*
* delete all cacheItems from repository
*/
exports.deleteAll = async()=>{
    await cacheRepository.deleteAll();
}

