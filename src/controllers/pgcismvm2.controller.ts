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
import { Cismvm2 } from '../models';
import { Cismvm2Repository } from '../repositories';

export class Pgcismvm2Controller {
  constructor(
    @repository(Cismvm2Repository)
    public cismvm2Repository: Cismvm2Repository,
  ) { }

  @post('/cismvm2s', {
    responses: {
      '200': {
        description: 'Cismvm2 model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cismvm2) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cismvm2, {
            title: 'NewCismvm2',

          }),
        },
      },
    })
    cismvm2: Cismvm2,
  ): Promise<Cismvm2> {
    return this.cismvm2Repository.create(cismvm2);
  }

  @get('/cismvm2s/count', {
    responses: {
      '200': {
        description: 'Cismvm2 model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Cismvm2)) where?: Where<Cismvm2>,
  ): Promise<Count> {
    return this.cismvm2Repository.count(where);
  }

  @get('/cismvm2s', {
    responses: {
      '200': {
        description: 'Array of Cismvm2 model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Cismvm2, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Cismvm2)) filter?: Filter<Cismvm2>,
  ): Promise<Cismvm2[]> {
    return this.cismvm2Repository.find(filter);
  }

  @patch('/cismvm2s', {
    responses: {
      '200': {
        description: 'Cismvm2 PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cismvm2, { partial: true }),
        },
      },
    })
    cismvm2: Cismvm2,
    @param.query.object('where', getWhereSchemaFor(Cismvm2)) where?: Where<Cismvm2>,
  ): Promise<Count> {
    return this.cismvm2Repository.updateAll(cismvm2, where);
  }




}
