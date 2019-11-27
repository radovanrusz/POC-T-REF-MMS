// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const kafkaHost = process.env.KAFKA_HOST
const kafkaHostEnv = process.env.KAFKA_HOST_ENV
const kafkaTopic = process.env.KAFKA_TOPIC
const kafka = require('kafka-node');

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

const Producer = kafka.Producer;
//const client = new kafka.KafkaClient()
const client = new kafka.KafkaClient({kafkaHost: kafkaHostEnv + ':9092'});
const producer = new Producer(client);

const kafka_topic = 'warehouse-movement';

try{
  /**
   * Kafka Producer Configuration
   */ 
      var mDate = new Date();
      var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
  
      producer.on('ready', async function() {
          console.log(mDateStr + ': Kafka Producer is Ready');
      })

      producer.on('error', function(err) {
          console.log(err);
          console.log(mDateStr + ': [kafka-producer -> '+kafka_topic+']: connection errored');
          throw err;
      })
}
catch(e) {
  console.log(mDateStr + ': ' + e);
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

// mozna lze osetrit pres nastaveni cors V config.json??
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Cache-Control, Pragma, Origin, ' +
        'Authorization, Content-Type, X-Requested-With'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })

    app.put('/mms',async (req,res) => {
    try {

      var mat = req.body
        mat.mvm1 = mat.mvm;
        delete mat.mvm;
        mat.mvm2 = 'wh9'

        // console.log('mat: ', mat)

        let payload = [{
            topic : 'warehouse-movement',
            messages : JSON.stringify(req.body)
        }]

        producer.send(payload,(err,data) => {
            if(err) {
                console.log(mDateStr + ': [kafka-producer -> '+kafka_topic+']: broker update failed')
                console.log(err)
                res.status(400).send('kafka errored')
            }
            else {
                console.log(mDateStr + ':[kafka-producer -> '+kafka_topic+']: broker update success')
                // console.log('payload: ' + JSON.stringify(payload))
                // console.log('data: ' + JSON.stringify(data))
                res.status(201).send(mDateStr + ': kafka topic updated sucessfully')
            }
        })
    }
    catch(e) {
        console.log(e);
        res.status(500).send({
            success : false,
            data : null,
            error : e
        })
    }        
})

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
