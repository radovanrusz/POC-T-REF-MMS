export declare class KafkaClientServiceService {
    kafkaTopic: string;
    kafkaPort: string;
    kafkaHost: string;
    constructor();
    sendEventP: (id: number, kmat: string, mvm1: string, mvm2: string, hmotnost: number, mnozstvi: number) => Promise<unknown>;
}
