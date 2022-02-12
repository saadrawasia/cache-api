# Cache API

## Up and running

	npm install
    npm start

## Routes
Get all cache items

    (get) localhost:3000/cache/

Get cache item with id

    (get) localhost:3000/cache/{id}

save cache item

    (post) localhost:3000/cache/
    (body) {
                value: "your value"
            }

update cache item

    (put) localhost:3000/cache/{id}
    (body) {
                value: "your value"
            }

delete cache item

    (delete) localhost:3000/cache/{id}     

delete all cache items

    (delete) localhost:3000/cache/                            