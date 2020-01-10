import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, db2: { schema: 'DB2INST1', table: 'MATERIAL' } } })
export class Material extends Entity {
  @property({
    type: 'string',
    length: 10,
    db2: { columnName: 'HMOTNOST', dataType: 'DECIMAL', dataLength: 10, dataPrecision: 10, dataScale: 3, nullable: 'Y' },
  })
  hmotnost?: string;

  @property({
    type: 'number',
    required: false,
    length: 4,
    precision: 4,
    scale: 0,
    id: 1,
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

  @property({
    type: 'STRING',
    length: 3,
    db2: { columnName: 'MVM', dataType: 'CHAR', dataLength: 3, nullable: 'N' },
  })
  mvm?: string;

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
