import { Entity, model, property, hasMany } from '@loopback/repository';
import { Material } from './material.model';
@model({
  settings: { idInjection: false, postgresql: { schema: 'public', table: 'cismvm2' } }
})
export class Cismvm2 extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 3,
    id: 1,
    postgresql: { columnName: 'mvm', dataType: 'character varying', dataLength: 3, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  mvm: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    postgresql: { columnName: 'nazev', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  nazev: string;

  @hasMany(() => Material, { keyTo: 'MVM' })
  materials: Material[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cismvm2>) {
    super(data);
  }
}

export interface Cismvm2Relations {
  // describe navigational properties here
}

export type Cismvm2WithRelations = Cismvm2 & Cismvm2Relations;
