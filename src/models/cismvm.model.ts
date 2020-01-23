import { Entity, model, property } from '@loopback/repository';

@model({ settings: { idInjection: false, db2: { schema: 'DB2INST1', table: 'CISMVM' } } })
export class Cismvm extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 3,
    id: true,
    db2: { columnName: 'MVM', dataType: 'VARCHAR', dataLength: 3, nullable: 'N' },
  })
  mvm: string;

  @property({
    type: 'string',
    length: 30,

    db2: { columnName: 'NAZEV', dataType: 'VARCHAR', dataLength: 30, dataPrecision: undefined, dataScale: 0, nullable: 'Y' },
  })
  nazev?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cismvm>) {
    super(data);
  }
}

export interface CismvmRelations {
  // describe navigational properties here
}

export type CismvmWithRelations = Cismvm & CismvmRelations;
