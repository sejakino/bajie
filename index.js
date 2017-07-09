let search = require('cep-promise')  // zip address search dependency.
let express = require('express')  // express to handle requests.
let cors = require('cors') // cors for opening cross domain requests.
let cache = require('express-cache-headers')  // leverage browser caching.

const env = (key, fallback) => process.env[key] || fallback  // get an env key

const cacheOptions = cache({ ttl: env('CACHE_TTL', 604800) , private: false }) // caching options: TTL and Visibility.

let router = express.Router() // create a express routes instance.

router.get('/:zip', cacheOptions, (req, res) => { // route that will handle that address search by zip code.
  const respond = (code, data) => res.status(code).json(data) // respond json, with custom code.

  search(req.params.zip) // try to locate the address for the given zip code.
    .then(address => respond(200, address)) // respond success.
    .catch(error => respond(404, error)) // respond error.
})

express()  // create an express instance and setup resources.
  .use(cors())  // tells express to use cors.
  .use('/', router)  // inject the router on express.
  .listen(env('HTTP_PORT', 5466))  // tell express to listen, on a given env port, defaults to 8090