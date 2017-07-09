// zip address search dependency.
let cep = require('cep-promise')
// express.
let express = require('express')
// cors for opening cross domain requests.
let cors = require('cors')

// create the cache plugin passing Redis info from env.
let cache = require('express-redis-cache')({
  // redis host, defaults to 127.0.0.1
  host: process.env.REDIS_HOST || '127.0.0.1',
  // redis port, defaults to 6379
  port: process.env.REDIS_PORT || 6379
});

// create an express instance.
let app = express()

// tell express to use cors.
app.use(cors())

// create a express routes instance.
let router = express.Router()

// declare the zip address search route.
// redis caching is enabled.
router.get('/:zip', cache.route(), (req, res) => {
  // get the zip code from request parameter.
  const zipCode = req.params.zip
  // try to locate the address for the given zip address.
  cep(zipCode)
    // return the address if success.
    .then(address => res.status(200).json(address))
    // return the api error, if any as NOT FOUND (404)
    .catch((e) => res.status(404).json(e))
})

// inject the router on express.
app.use('/', router)

// tell express to listen, on a given env port, defaults to 8090
app.listen(process.env.PORT || 8090)