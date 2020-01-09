import { Entity } from '@loopback/repository';
export declare class Cismvm extends Entity {
    mvm: string;
    nazev?: string;
    [prop: string]: any;
    constructor(data?: Partial<Cismvm>);
}
export interface CismvmRelations {
}
export declare type CismvmWithRelations = Cismvm & CismvmRelations;
