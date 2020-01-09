import { Count, Filter, Where } from '@loopback/repository';
import { Material } from '../models';
import { MaterialRepository } from '../repositories';
export declare class MaterialStandardController {
    materialRepository: MaterialRepository;
    constructor(materialRepository: MaterialRepository);
    create(material: Omit<Material, 'id'>): Promise<Material>;
    count(where?: Where<Material>): Promise<Count>;
    find(filter?: Filter<Material>): Promise<Material[]>;
    updateAll(material: Material, where?: Where<Material>): Promise<Count>;
    findById(id: number, filter?: Filter<Material>): Promise<Material>;
    updateById(id: number, material: Material): Promise<void>;
    replaceById(id: number, material: Material): Promise<void>;
    deleteById(id: number): Promise<void>;
}
