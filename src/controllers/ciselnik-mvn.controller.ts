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
import { Cismvm } from '../models';
import { CismvmRepository } from '../repositories';

export class CiselnikMvnController {
  constructor(
    @repository(CismvmRepository)
    public cismvmRepository: CismvmRepository,
  ) { }

  @post('/cismvms', {
    responses: {
      '200': {
        description: 'Cismvm model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cismvm) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cismvm, {
            title: 'NewCismvm',

          }),
        },
      },
    })
    cismvm: Cismvm,
  ): Promise<Cismvm> {
    return this.cismvmRepository.create(cismvm);
  }

  @get('/cismvms/count', {
    responses: {
      '200': {
        description: 'Cismvm model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cismvm)) where?: Where<Cismvm>,
  ): Promise<Count> {
    return this.cismvmRepository.count(where);
  }

  @get('/cismvms', {
    responses: {
      '200': {
        description: 'Array of Cismvm model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cismvm, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cismvm)) filter?: Filter<Cismvm>,
  ): Promise<Cismvm[]> {
    return this.cismvmRepository.find(filter);
  }

  @patch('/cismvms', {
    responses: {
      '200': {
        description: 'Cismvm PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cismvm, { partial: true }),
        },
      },
    })
    cismvm: Cismvm,
    @param.query.object('where', getWhereSchemaFor(Cismvm)) where?: Where<Cismvm>,
  ): Promise<Count> {
    return this.cismvmRepository.updateAll(cismvm, where);
  }

  @get('/cismvms/{id}', {
    responses: {
      '200': {
        description: 'Cismvm model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cismvm, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Cismvm)) filter?: Filter<Cismvm>
  ): Promise<Cismvm> {
    return this.cismvmRepository.findById(id, filter);
  }

  @patch('/cismvms/{id}', {
    responses: {
      '204': {
        description: 'Cismvm PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cismvm, { partial: true }),
        },
      },
    })
    cismvm: Cismvm,
  ): Promise<void> {
    await this.cismvmRepository.updateById(id, cismvm);
  }

  @put('/cismvms/{id}', {
    responses: {
      '204': {
        description: 'Cismvm PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cismvm: Cismvm,
  ): Promise<void> {
    await this.cismvmRepository.replaceById(id, cismvm);
  }

  @del('/cismvms/{id}', {
    responses: {
      '204': {
        description: 'Cismvm DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cismvmRepository.deleteById(id);
  }
}
