import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Cismvm2 } from './cismvm2.model';

@model({ settings: { idInjection: false, db2: { schema: 'DB2INST1', table: 'MATERIAL2' } } })
export class Material2 extends Entity {
  @property({
    type: 'string',
    length: 10,
    precision: 0,
    scale: 3,
    db2: { columnName: 'HMOTNOST', dataType: 'DECIMAL', dataLength: 10, dataPrecision: undefined, dataScale: 3, nullable: 'Y' },
  })
  hmotnost?: string;

  @property({
    type: 'number',
    required: true,
    length: 4,
    precision: 0,
    scale: 0,
    id: 1,
    db2: { columnName: 'ID', dataType: 'INTEGER', dataLength: 4, dataPrecision: undefined, dataScale: 0, nullable: 'N' },
  })
  id: number;

  @property({
    type: 'string',
    length: 12,
    precision: 0,
    scale: 0,
    db2: { columnName: 'KMAT', dataType: 'VARCHAR', dataLength: 12, dataPrecision: undefined, dataScale: 0, nullable: 'Y' },
  })
  kmat?: string;

  @property({
    type: 'string',
    length: 10,
    precision: 0,
    scale: 3,
    db2: { columnName: 'MNOZSTVI', dataType: 'DECIMAL', dataLength: 10, dataPrecision: undefined, dataScale: 3, nullable: 'Y' },
  })
  mnozstvi?: string;

  @property({
    type: 'string',
    required: true,
    length: 3,
    precision: 0,
    scale: 0,
    db2: { columnName: 'MVM', dataType: 'CHARACTER', dataLength: 3, dataPrecision: undefined, dataScale: 0, nullable: 'N' },
  })
  mvm: string;

  @belongsTo(() => Cismvm2, { keyFrom: 'MVM' }, { keyTo: 'MVM' })
  MVM: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Material2>) {
    super(data);
  }
}

export interface Material2Relations {
  // describe navigational properties here
}

export type Material2WithRelations = Material2 & Material2Relations;
