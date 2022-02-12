'use strict';
var Cache = require('../config/db');
module.exports = new class CacheRepository {

    getAll() {
        return Cache.find();
    }

    getById(id) {
        return Cache.findById(id);
    }

    create(cache) {
        return Cache.create(cache);
    }

    update(id, cache) {

        const updatedCache = {
            value: cache.value,
            ttl: cache.ttl,
        }

        return Cache.findByIdAndUpdate(id, updatedCache);
    }

    delete(id) {
        return Cache.findByIdAndRemove(id);
    }
}