import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Material, MaterialRelations, Cismvm } from '../models';
import { Db2DataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { CismvmRepository } from './cismvm.repository';
export declare class MaterialRepository extends DefaultCrudRepository<Material, typeof Material.prototype.mvm, MaterialRelations> {
    protected cismvmRepositoryGetter: Getter<CismvmRepository>;
    readonly cismvm: BelongsToAccessor<Cismvm, typeof Material.prototype.mvm>;
    constructor(dataSource: Db2DataSource, cismvmRepositoryGetter: Getter<CismvmRepository>);
}
