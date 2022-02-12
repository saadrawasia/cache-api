'use strict';

const { cacheSize } = require('../config/opts');
const cacheRepository = require('../repositories/cacheRepository');

const getCacheItemWithClosestExpireTime = async()=>{
    const getAllCache = await this.get();
    getAllCache.sort(function(a, b) {
        return a.expires - b.expires;
      });
    return getAllCache[0];  
}

exports.get = async() =>{
    return await cacheRepository.getAll();
}

exports.getById = async(id) => {
    return await cacheRepository.getById(id);
}

exports.create = async(cache)=>{
   const getAllCache = await this.get();
   if(getAllCache.length < cacheSize){
        return await cacheRepository.create(cache);
   }
   var item = await getCacheItemWithClosestExpireTime();
   item.value = cache.value;
   item.expires = cache.expires;
   return await cacheRepository.create(item);
}
exports.update = async(id, body)=>{
    return await cacheRepository.update(id, body);
}
exports.delete = async(id) => {
    await cacheRepository.delete(id);
}
exports.deleteAll = async()=>{
    await cacheRepository.deleteAll();
}

