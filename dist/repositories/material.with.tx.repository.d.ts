import { DefaultCrudRepository } from '@loopback/repository';
import { Material, MaterialRelations } from '../models';
import { Db2DataSource } from '../datasources';
export declare class MaterialWithTxRepository extends DefaultCrudRepository<Material, typeof Material.prototype.id, MaterialRelations> {
    constructor(dataSource: Db2DataSource);
}
