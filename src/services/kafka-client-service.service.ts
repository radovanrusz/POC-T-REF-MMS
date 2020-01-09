import { bind, /* inject, */ BindingScope } from '@loopback/core';



import {
  KafkaClient,
  Producer
} from 'kafka-node';
require('dotenv').config();


interface Message {
  id: number;
  kmat: string;
  mvm1: string,
  mvm2: string,
  hmotnost: number,
  mnozstvi: number,
  timestamp: string
}

@bind({ scope: BindingScope.TRANSIENT })
export class KafkaClientServiceService {
  kafkaTopic: string
  kafkaPort: string
  kafkaHost: string

  constructor(/* Add @inject to inject parameters */) {

  }

  async sendEventP(id: number, kmat: string, mvm1: string, mvm2: string, hmotnost: number, mnozstvi: number) {
    console.log(`ENV: Running with kafka topic: ${process.env.KAFKA_TOPIC}`)
    const kafkaHost = process.env.KAFKA_HOST ?? 'localhost';
    const kafkaPort = process.env.KAFKA_PORT ?? '9092';
    const kafkaTopic = process.env.KAFKA_TOPIC ?? 'warehouse-movement';
    //console.log(`VAR: Running with kafka topic: ${kafkaTopic}`)


    return new Promise(function (resolve, reject) {
      let mDate = new Date();
      let mDateStr = mDate.toLocaleDateString('cs-CS');
      const msg: Message = {
        id: id,
        kmat: kmat,
        mvm1: mvm1,
        mvm2: mvm2,
        hmotnost: hmotnost,
        mnozstvi: mnozstvi,
        timestamp: new Date().toISOString()
      }
      const payload = [{
        topic: kafkaTopic,
        messages: JSON.stringify(msg)
      }];
      console.log(mDateStr + ': Going to use producer ..');
      try {
        // Kafka Producer Configuration
        mDate = new Date();
        mDateStr = mDate.toLocaleDateString('cs-CS');
        console.log(mDateStr + ': Trying to connect to Kafka server: ' + kafkaHost + ':' + kafkaPort + ', topic: ' + kafkaTopic);
        //const Producer = kafka.Producer;
        const client = new KafkaClient({ kafkaHost: kafkaHost + ':' + kafkaPort });
        const producer = new Producer(client);

        producer.on('ready', async function () {
          mDate = new Date();
          mDateStr = mDate.toLocaleDateString('cs-CS');
          console.log(mDateStr + ': Kafka Producer is Ready to communicate with Kafka on: ' + kafkaHost + ':' + kafkaPort);
          producer.send(payload, function (err, data) {
            mDate = new Date();
            mDateStr = mDate.toLocaleDateString('cs-CS');
            if (err) {
              console.error(mDateStr + ': Broker update failed: ' + err);
              reject(err);
            } else {
              console.log(`${mDateStr}: Broker update success: ${JSON.stringify(data)}`);
              resolve(data);
            }
          });
        })

        producer.on('error', function (err) {
          mDate = new Date();
          mDateStr = mDate.toLocaleDateString('cs-CS');
          console.error(err);
          console.error(mDateStr + ': [kafka-producer -> ' + kafkaTopic + ']: connection errored');
          reject(err);
        })
      } catch (err) {
        console.error(mDateStr + ': ' + err);
        reject(err);
      }






    })
  }
}
