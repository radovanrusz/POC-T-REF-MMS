import { Entity } from '@loopback/repository';
import { Material } from './material.model';
export declare class Cismvm extends Entity {
    mvm: string;
    nazev?: string;
    materials: Material[];
    [prop: string]: any;
    constructor(data?: Partial<Cismvm>);
}
export interface CismvmRelations {
}
export declare type CismvmWithRelations = Cismvm & CismvmRelations;
