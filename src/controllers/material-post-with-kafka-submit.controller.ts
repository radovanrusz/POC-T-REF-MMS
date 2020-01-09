
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

    //vytvoreni transakce
    const tx = await this.materialRepository.beginTransaction(IsolationLevel.READ_COMMITTED);

    //insert v ramci transakce
    const result1 = await this.materialRepository.create(material, { transaction: tx });
    console.log(`C db update result: ${JSON.stringify(result1)} -> going to commit/rollback`)
    //const result2 = await this.kafkaClientServices.sendEventP(id, kmat, mvm, 'test', hmotnost, mnozstvi)
    console.log(`C kafka sumbit result: ${JSON.stringify(result1)} -> going to commit/rollback`)
    await tx.commit()
    //await tx.rollback()
    console.log(`aFter commit/rollback -> finishing...`)
    return result1
  }

}
