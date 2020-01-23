import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Material,
  Cismvm,
} from '../models';
import {MaterialRepository} from '../repositories';

export class MaterialCismvmController {
  constructor(
    @repository(MaterialRepository)
    public materialRepository: MaterialRepository,
  ) { }

  @get('/materials/{id}/cismvm', {
    responses: {
      '200': {
        description: 'Cismvm belonging to Material',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cismvm)},
          },
        },
      },
    },
  })
  async getCismvm(
    @param.path.number('id') id: typeof Material.prototype.id,
  ): Promise<Cismvm> {
    return this.materialRepository.cismvm(id);
  }
}
