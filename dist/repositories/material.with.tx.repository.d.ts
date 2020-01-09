import { DefaultTransactionalRepository } from '@loopback/repository';
import { Material, MaterialRelations } from '../models';
import { Db2DataSource } from '../datasources';
export declare class MaterialWithTxRepository extends DefaultTransactionalRepository<Material, typeof Material.prototype.id, MaterialRelations> {
    constructor(dataSource: Db2DataSource);
}
