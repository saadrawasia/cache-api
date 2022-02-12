'use strict';
var Cache = require('../config/db');
const { ttl } = require('../config/opts');
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
            expires: Date.now() + ttl,
        }

        return Cache.findByIdAndUpdate(id, updatedCache);
    }

    delete(id) {
        return Cache.findByIdAndRemove(id);
    }
}