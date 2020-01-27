import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { Material, MaterialRelations, Cismvm2 } from '../models';
import { Db2DataSource } from '../datasources';
import { Getter } from '@loopback/core';
import { Cismvm2Repository } from './cismvm2.repository';
export declare class MaterialRepository extends DefaultCrudRepository<Material, typeof Material.prototype.id, MaterialRelations> {
    protected cismvm2RepositoryGetter: Getter<Cismvm2Repository>;
    readonly cismvm2: BelongsToAccessor<Cismvm2, typeof Cismvm2.prototype.id>;
    constructor(dataSource: Db2DataSource, cismvm2RepositoryGetter: Getter<Cismvm2Repository>);
}
