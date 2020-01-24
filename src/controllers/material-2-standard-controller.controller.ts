import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Material2 } from '../models/material2.model';
import { Material2Repository } from '../repositories/material2.repository';

export class Material2StandardControllerController {
  constructor(
    @repository(Material2Repository)
    public material2Repository: Material2Repository,
  ) { }

  @post('/material2s', {
    responses: {
      '200': {
        description: 'Material2 model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Material2) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material2, {
            title: 'NewMaterial2',
            exclude: ['id'],
          }),
        },
      },
    })
    material2: Omit<Material2, 'id'>,
  ): Promise<Material2> {
    return this.material2Repository.create(material2);
  }

  @get('/material2s/count', {
    responses: {
      '200': {
        description: 'Material2 model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Material2)) where?: Where<Material2>,
  ): Promise<Count> {
    return this.material2Repository.count(where);
  }

  @get('/material2s', {
    responses: {
      '200': {
        description: 'Array of Material2 model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Material2, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Material2)) filter?: Filter<Material2>,
  ): Promise<Material2[]> {
    const result0 = this.material2Repository.find({ include: [{ relation: 'MVM' }] });
    console.log(JSON.stringify(result0))
    const result1 = this.material2Repository.find(filter);
    console.log(JSON.stringify(result1))
    return result0
  }

  @patch('/material2s', {
    responses: {
      '200': {
        description: 'Material2 PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material2, { partial: true }),
        },
      },
    })
    material2: Material2,
    @param.query.object('where', getWhereSchemaFor(Material2)) where?: Where<Material2>,
  ): Promise<Count> {
    return this.material2Repository.updateAll(material2, where);
  }

  @get('/material2s/{id}', {
    responses: {
      '200': {
        description: 'Material2 model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Material2, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Material2)) filter?: Filter<Material2>
  ): Promise<Material2> {
    return this.material2Repository.findById(id, filter);
  }

  @patch('/material2s/{id}', {
    responses: {
      '204': {
        description: 'Material2 PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material2, { partial: true }),
        },
      },
    })
    material2: Material2,
  ): Promise<void> {
    await this.material2Repository.updateById(id, material2);
  }

  @put('/material2s/{id}', {
    responses: {
      '204': {
        description: 'Material2 PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() material2: Material2,
  ): Promise<void> {
    await this.material2Repository.replaceById(id, material2);
  }

  @del('/material2s/{id}', {
    responses: {
      '204': {
        description: 'Material2 DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.material2Repository.deleteById(id);
  }
}
