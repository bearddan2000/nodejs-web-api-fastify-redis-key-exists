var redis = require('redis');
var client = redis.createClient(6379, 'redis'); //creates a new client
// Require the framework and instantiate it
const app = require('fastify')({
    logger: true
})

client.on('connect', function() {
  app.log.info('connected');
});


client.sadd(['frameworks', 'angularjs', 'backbone']);

app.get('/', (req, res) => {
  client.exists('frameworks', function(err, reply) {
    let val = (reply == 1) ? true : false;
      res.send({
        condition: 'key frameworks exists',
          message: val
      });
  });
});

app.listen(3000, '0.0.0.0');
