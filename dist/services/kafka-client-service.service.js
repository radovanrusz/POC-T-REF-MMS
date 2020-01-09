"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const kafka_node_1 = require("kafka-node");
require('dotenv').config();
let KafkaClientServiceService = class KafkaClientServiceService {
    constructor( /* Add @inject to inject parameters */) {
    }
    async sendEventP(id, kmat, mvm1, mvm2, hmotnost, mnozstvi) {
        var _a, _b, _c;
        console.log(`ENV: Running with kafka topic: ${process.env.KAFKA_TOPIC}`);
        const kafkaHost = (_a = process.env.KAFKA_HOST, (_a !== null && _a !== void 0 ? _a : 'localhost'));
        const kafkaPort = (_b = process.env.KAFKA_PORT, (_b !== null && _b !== void 0 ? _b : '9092'));
        const kafkaTopic = (_c = process.env.KAFKA_TOPIC, (_c !== null && _c !== void 0 ? _c : 'warehouse-movement'));
        //console.log(`VAR: Running with kafka topic: ${kafkaTopic}`)
        return new Promise(function (resolve, reject) {
            let mDate = new Date();
            let mDateStr = mDate.toISOString();
            try {
                const msg = {
                    id: id,
                    kmat: kmat,
                    mvm1: mvm1,
                    mvm2: mvm2,
                    hmotnost: hmotnost,
                    mnozstvi: mnozstvi,
                    timestamp: new Date().toISOString()
                };
                const payload = [{
                        topic: kafkaTopic,
                        messages: JSON.stringify(msg)
                    }];
                console.log(mDateStr + ': Going to use producer ..');
                // Kafka Producer Configuration
                mDate = new Date();
                mDateStr = mDate.toISOString();
                console.log(mDateStr + ': Trying to connect to Kafka server: ' + kafkaHost + ':' + kafkaPort + ', topic: ' + kafkaTopic);
                //const Producer = kafka.Producer;
                const client = new kafka_node_1.KafkaClient({ kafkaHost: kafkaHost + ':' + kafkaPort });
                const producer = new kafka_node_1.Producer(client);
                producer.on('ready', async function () {
                    mDate = new Date();
                    mDateStr = mDate.toISOString();
                    console.log(mDateStr + ': Kafka Producer is Ready to communicate with Kafka on: ' + kafkaHost + ':' + kafkaPort);
                    producer.send(payload, function (err, data) {
                        mDate = new Date();
                        mDateStr = mDate.toISOString();
                        if (err) {
                            console.error(mDateStr + ': Broker update failed: ' + err);
                            reject(err);
                        }
                        else {
                            console.log(`${mDateStr}: Broker update success: ${JSON.stringify(data)}`);
                            resolve(data);
                        }
                    });
                });
                producer.on('error', function (err) {
                    mDate = new Date();
                    mDateStr = mDate.toISOString();
                    console.error(err);
                    console.error(mDateStr + ': [kafka-producer -> ' + kafkaTopic + ']: connection errored');
                    reject(err);
                });
            }
            catch (err) {
                console.error(mDateStr + ': ' + err);
                reject(err);
            }
        });
    }
};
KafkaClientServiceService = __decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], KafkaClientServiceService);
exports.KafkaClientServiceService = KafkaClientServiceService;
//# sourceMappingURL=kafka-client-service.service.js.map