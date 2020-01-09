import { DefaultCrudRepository } from '@loopback/repository';
import { Cismvm, CismvmRelations } from '../models';
import { Db2DataSource } from '../datasources';
export declare class CismvmRepository extends DefaultCrudRepository<Cismvm, typeof Cismvm.prototype.mvm, CismvmRelations> {
    constructor(dataSource: Db2DataSource);
}
