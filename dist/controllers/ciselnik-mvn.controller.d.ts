import { Count, Filter, Where } from '@loopback/repository';
import { Cismvm } from '../models';
import { CismvmRepository } from '../repositories';
export declare class CiselnikMvnController {
    cismvmRepository: CismvmRepository;
    constructor(cismvmRepository: CismvmRepository);
    create(cismvm: Cismvm): Promise<Cismvm>;
    count(where?: Where<Cismvm>): Promise<Count>;
    find(filter?: Filter<Cismvm>): Promise<Cismvm[]>;
    updateAll(cismvm: Cismvm, where?: Where<Cismvm>): Promise<Count>;
    findById(id: string, filter?: Filter<Cismvm>): Promise<Cismvm>;
    updateById(id: string, cismvm: Cismvm): Promise<void>;
    replaceById(id: string, cismvm: Cismvm): Promise<void>;
    deleteById(id: string): Promise<void>;
}
