import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cismvm,
  Material,
} from '../models';
import {CismvmRepository} from '../repositories';

export class CismvmMaterialController {
  constructor(
    @repository(CismvmRepository) protected cismvmRepository: CismvmRepository,
  ) { }

  @get('/cismvms/{id}/materials', {
    responses: {
      '200': {
        description: 'Array of Material\'s belonging to Cismvm',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Material)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Material>,
  ): Promise<Material[]> {
    return this.cismvmRepository.materials(id).find(filter);
  }

  @post('/cismvms/{id}/materials', {
    responses: {
      '200': {
        description: 'Cismvm model instance',
        content: {'application/json': {schema: getModelSchemaRef(Material)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cismvm.prototype.mvm,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material, {
            title: 'NewMaterialInCismvm',
            exclude: ['id'],
            optional: ['mvm']
          }),
        },
      },
    }) material: Omit<Material, 'id'>,
  ): Promise<Material> {
    return this.cismvmRepository.materials(id).create(material);
  }

  @patch('/cismvms/{id}/materials', {
    responses: {
      '200': {
        description: 'Cismvm.Material PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Material, {partial: true}),
        },
      },
    })
    material: Partial<Material>,
    @param.query.object('where', getWhereSchemaFor(Material)) where?: Where<Material>,
  ): Promise<Count> {
    return this.cismvmRepository.materials(id).patch(material, where);
  }

  @del('/cismvms/{id}/materials', {
    responses: {
      '200': {
        description: 'Cismvm.Material DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Material)) where?: Where<Material>,
  ): Promise<Count> {
    return this.cismvmRepository.materials(id).delete(where);
  }
}
