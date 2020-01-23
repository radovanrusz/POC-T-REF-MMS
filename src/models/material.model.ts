import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Cismvm } from './cismvm.model';

@model({
  settings:
  {
    idInjection: false, db2: { schema: 'DB2INST1', table: 'MATERIAL' }
  },
  foreignKeys: {
    cismvmId: {
      name: 'cismvmId',
      entity: 'cismvm',
      entityKey: 'MVM',
      foreignKey: 'MVM',
    }
  }
}
)
export class Material extends Entity {
  @property({
    type: 'string',
    length: 10,

    scale: 3,
    db2: { columnName: 'HMOTNOST', dataType: 'DECIMAL', dataLength: 10, dataPrecision: undefined, dataScale: 3, nullable: 'Y' },
  })
  hmotnost?: string;

  @property({
    type: 'number',
    required: false,
    length: 4,
    precision: 4,
    scale: 0,
    id: true,
    db2: { columnName: 'ID', dataType: 'INTEGER', dataLength: 4, dataPrecision: 4, dataScale: 0, nullable: 'N' },
  })
  id: number;

  @property({
    type: 'string',
    length: 12,
    db2: { columnName: 'KMAT', dataType: 'VARCHAR', dataLength: 12, nullable: 'Y' },
  })
  kmat?: string;

  @property({
    type: 'string',
    length: 10,
    db2: { columnName: 'MNOZSTVI', dataType: 'DECIMAL', dataLength: 10, dataPrecision: 10, dataScale: 3, nullable: 'Y' },
  })
  mnozstvi?: string;
  /*
    @property({
      type: 'string',
      length: 4,
      db2: { columnName: 'MVM', dataType: 'VARCHAR', dataLength: 4, nullable: 'Y' },
    })
    mvm?: string;
  */

  @belongsTo(() => Cismvm, { keyFrom: 'MVM', keyTo: 'MVM' })
  MVM: string;




  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Material>) {
    super(data);
  }
}

export interface MaterialRelations {
  // describe navigational properties here
}

export type MaterialWithRelations = Material & MaterialRelations;
