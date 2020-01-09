
import {
  IsolationLevel,
  repository

} from '@loopback/repository';
import {
  post,
  getModelSchemaRef,
  requestBody,
} from '@loopback/rest';
import { Material } from '../models';
import { MaterialWithTxRepository } from '../repositories';
import { ScenarioSimulatorService } from '../services';
import { KafkaClientServiceService } from '../services';
//import { inject } from '@loopback/context';
import { service } from '@loopback/core';


export class MaterialPostWithKafkaSubmitController {
  constructor(
    @repository(MaterialWithTxRepository)
    public materialRepository: MaterialWithTxRepository,
    @service(ScenarioSimulatorService)
    public scenarioSimulator: ScenarioSimulatorService,
    @service(KafkaClientServiceService)
    public kafkaClientServices: KafkaClientServiceService
  ) { }

  @post('/post-material-submit-kafka', {
    responses: {
      '200': {
        description: 'Material successfuly updated, Kafka message sent',
        content: { 'application/json': { schema: getModelSchemaRef(Material) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material, {
            title: 'NewMaterial',
            exclude: ['id'],
          }),
        },
      },
    })
    material: Omit<Material, 'id'>,
  ): Promise<Material> {
    console.log(`C: running post with incoming material: ${JSON.stringify(material)}`)
    const { id, kmat, mvm, hmotnost, mnozstvi } = material
    //Business logika je externalizovana do sdilene sluzby pouzitelne ve vice controllerech
    const scenario = this.scenarioSimulator.calcScenario(id, kmat, mvm, hmotnost, mnozstvi)
    console.log(`C picking scenario: ${JSON.stringify(scenario)}`)

    //vytvoreni transakce, timeout pro rollback 3sec
    const tx = await this.materialRepository.beginTransaction({ isolationLevel: IsolationLevel.READ_COMMITTED, timeout: 3000 });

    //insert v ramci transakce
    const result1 = await this.materialRepository.create(material, { transaction: tx });
    console.log(`C db update result: ${JSON.stringify(result1)} -> going to commit/rollback`)

    //Prace s Kafka je take externalizovano do sdilene sluzby
    try {
      const result2 = await this.kafkaClientServices.sendEventP(id, kmat, mvm, 'test', hmotnost, mnozstvi)

      console.log(`C kafka submit result: ${JSON.stringify(result2)} -> going to commit`)
      await tx.commit()
      return result1
    } catch (err) {
      console.log(`C kafka submit failure: ${JSON.stringify(err)} -> going to cancel`)
      await tx.rollback()

    }

    return result1

  }

}
