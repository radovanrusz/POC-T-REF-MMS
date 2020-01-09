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
        var _a, _b, _c;
        this.sendEventP = async function (id, kmat, mvm1, mvm2, hmotnost, mnozstvi) {
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
                    const client = new kafka_node_1.KafkaClient({ kafkaHost: this.kafkaHost + ':' + this.kafkaPort });
                    const producer = new kafka_node_1.Producer(client);
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
                            }
                            else {
                                console.log(mDateStr + ': Broker update success.');
                                resolve(data);
                            }
                        });
                    });
                    producer.on('error', function (err) {
                        mDate = new Date();
                        mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                        console.log(err);
                        console.log(mDateStr + ': [kafka-producer -> ' + this.kafkaTopic + ']: connection errored');
                        reject(err);
                    });
                }
                catch (e) {
                    console.log(mDateStr + ': ' + e);
                    reject(err);
                }
            });
        };
        this.kafkaHost = (_a = process.env.KAFKA_HOST, (_a !== null && _a !== void 0 ? _a : 'localhost'));
        this.kafkaPort = (_b = process.env.KAFKA_PORT, (_b !== null && _b !== void 0 ? _b : '9092'));
        this.kafkaTopic = (_c = process.env.KAFKA_TOPIC, (_c !== null && _c !== void 0 ? _c : 'warehouse-movement'));
    }
};
KafkaClientServiceService = __decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], KafkaClientServiceService);
exports.KafkaClientServiceService = KafkaClientServiceService;
//# sourceMappingURL=kafka-client-service.service.js.map