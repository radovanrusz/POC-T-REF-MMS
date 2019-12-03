const kafkaHost = process.env.KAFKA_HOST;
const kafkaPort = process.env.KAFKA_PORT;
const kafkaTopic = process.env.KAFKA_TOPIC;
exports.sendEvent = function (kmat, mnozstvi, mvmTo, mvmFrom, hmotnost,resp,cb) {
    console.log('SmallKafka booting ...')
    var kafka = require('kafka-node'),
        HighLevelProducer = kafka.HighLevelProducer,
        client = new kafka.KafkaClient({kafkaHost: kafkaHost + ':'+ kafkaPort}),
        producer = new HighLevelProducer(client),
        payloads = [
            { topic: kafkaTopic, messages: 'hi', partition: 0 },
            { topic: kafkaTopic, messages: ['hello', 'world'] }
        ];
    producer.on('ready', function () {
        console.log('Producer ready, sending:');
        console.log(payloads);
        console.log('...');
        producer.send(payloads, function (err, data) {
            if (err) {
                console.log('error: ' + err);
                cb(err);
            } else {
                console.log('success: ' + data);
                cb(resp);
            }
        });
    });
    
    producer.on('error', function (err) {
        console.log('SmallKafka init failed: ' + err);
        cb(err);
    });
}