import { bind, /* inject, */ BindingScope } from '@loopback/core';



import {
  KafkaClient,
  Producer
} from 'kafka-node';
require('dotenv').config();

@bind({ scope: BindingScope.TRANSIENT })
export class KafkaClientServiceService {
  kafkaTopic: string
  kafkaPort: string
  kafkaHost: string

  constructor(/* Add @inject to inject parameters */) {
    this.kafkaHost = process.env.KAFKA_HOST ?? 'localhost';
    this.kafkaPort = process.env.KAFKA_PORT ?? '9092';
    this.kafkaTopic = process.env.KAFKA_TOPIC ?? 'warehouse-movement';
  }

  sendEventP = async function (id: number, kmat: string, mvm1: string, mvm2: string, hmotnost: number, mnozstvi: number) {
    return new Promise(function (resolve, reject) {
      let mDate = new Date();
      let mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
      const msg = {};
      msg.id = id;
      msg.kmat = kmat;
      msg.mvm1 = mvm1;
      msg.mvm2 = mvm2;
      msg.hmotnost = hmotnost;
      msg.mnozstvi = mnozstvi;
      msg.timestamp = new Date().toISOString();
      const payload = [{
        topic: this.kafkaTopic,
        messages: JSON.stringify(msg)
      }];
      console.log(mDateStr + ': Going to use producer ..');
      try {
        // Kafka Producer Configuration
        mDate = new Date();
        mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
        console.log(mDateStr + ': Trying to connect to Kafka server: ' + this.kafkaHost + ':' + this.kafkaPort + ', topic: ' + this.kafkaTopic);
        //const Producer = kafka.Producer;
        const client = new KafkaClient({ kafkaHost: this.kafkaHost + ':' + this.kafkaPort });
        const producer = new Producer(client);

        producer.on('ready', async function () {
          mDate = new Date();
          mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
          console.log(mDateStr + ': Kafka Producer is Ready to communicate with Kafka on: ' + this.kafkaHost + ':' + this.kafkaPort);
          const push_status = producer.send(payload, function (err, data) {
            mDate = new Date();
            mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            if (err) {
              console.log(mDateStr + ': Broker update failed: ' + err);
              reject(err);
            } else {
              console.log(mDateStr + ': Broker update success.');
              resolve(data);
            }
          });
        })

        producer.on('error', function (err) {
          mDate = new Date();
          mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
          console.log(err);
          console.log(mDateStr + ': [kafka-producer -> ' + this.kafkaTopic + ']: connection errored');
          reject(err);
        })
      } catch (e) {
        console.log(mDateStr + ': ' + e);
        reject(err);
      }






    })
  }
}
