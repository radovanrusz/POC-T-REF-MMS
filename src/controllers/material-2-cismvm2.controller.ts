import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Material2,
  Cismvm2,
} from '../models';
import {Material2Repository} from '../repositories';

export class Material2Cismvm2Controller {
  constructor(
    @repository(Material2Repository)
    public material2Repository: Material2Repository,
  ) { }

  @get('/material2s/{id}/cismvm2', {
    responses: {
      '200': {
        description: 'Cismvm2 belonging to Material2',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cismvm2)},
          },
        },
      },
    },
  })
  async getCismvm2(
    @param.path.number('id') id: typeof Material2.prototype.id,
  ): Promise<Cismvm2> {
    return this.material2Repository.cismvm2(id);
  }
}
