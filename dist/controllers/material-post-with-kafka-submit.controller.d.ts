import { Material } from '../models';
import { MaterialWithTxRepository } from '../repositories';
import { ScenarioSimulatorService } from '../services';
import { KafkaClientServiceService } from '../services';
export declare class MaterialPostWithKafkaSubmitController {
    materialRepository: MaterialWithTxRepository;
    scenarioSimulator: ScenarioSimulatorService;
    kafkaClientServices: KafkaClientServiceService;
    constructor(materialRepository: MaterialWithTxRepository, scenarioSimulator: ScenarioSimulatorService, kafkaClientServices: KafkaClientServiceService);
    create(material: Omit<Material, 'id'>): Promise<Material>;
}
