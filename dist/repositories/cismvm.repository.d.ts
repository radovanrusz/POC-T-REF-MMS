import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { Cismvm, CismvmRelations, Material } from '../models';
import { Db2DataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { MaterialRepository } from './material.repository';
export declare class CismvmRepository extends DefaultCrudRepository<Cismvm, typeof Cismvm.prototype.mvm, CismvmRelations> {
    protected materialRepositoryGetter: Getter<MaterialRepository>;
    readonly materials: HasManyRepositoryFactory<Material, typeof Cismvm.prototype.mvm>;
    constructor(dataSource: Db2DataSource, materialRepositoryGetter: Getter<MaterialRepository>);
}
