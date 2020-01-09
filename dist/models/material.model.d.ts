import { Entity } from '@loopback/repository';
export declare class Material extends Entity {
    hmotnost?: string;
    id: number;
    kmat?: string;
    mnozstvi?: number;
    mvm?: string;
    [prop: string]: any;
    constructor(data?: Partial<Material>);
}
export interface MaterialRelations {
}
export declare type MaterialWithRelations = Material & MaterialRelations;
