import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Material, MaterialRelations, Cismvm, Cismvm2 } from '../models';
import { Db2DataSource, PgDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { CismvmRepository } from './cismvm.repository';
import { Cismvm2Repository } from './cismvm2.repository';

export class MaterialRepository extends DefaultCrudRepository<
  Material,
  typeof Number,
  MaterialRelations
  > {

  public readonly cismvm2: BelongsToAccessor<Cismvm2, typeof String>;

  // DB2
  // public readonly cismvm: BelongsToAccessor<Cismvm, typeof String>;

  /* nechodi
  constr uctor(
    @inject('datasources.pg') dataSource: PgDataSource, @repository.getter('CismvmRepository2') protected cismvmRepositoryGetter: Getter<Cismvm2Repository>,
  ) {
    super(Material, dataSource);
    this.cismvm = this.createBelongsToAccessorFor('MVM', cismvmRepositoryGetter);
    this.registerInclusionResolver('MVM', this.cismvm.inclusionResolver);
  }
*/


  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('Cismvm2Repository') protected cismvm2RepositoryGetter: Getter<Cismvm2Repository>,
  ) {
    super(Material, dataSource);
    this.cismvm2 = this.createBelongsToAccessorFor('MVM', cismvm2RepositoryGetter);
    this.registerInclusionResolver('MVM', this.cismvm2.inclusionResolver);
  }


  /* DB2 chodi
  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('CismvmRepository') protected cismvmRepositoryGetter: Getter<CismvmRepository>,
  ) {
    super(Material, dataSource);
    this.cismvm = this.createBelongsToAccessorFor('MVM', cismvmRepositoryGetter);
    this.registerInclusionResolver('MVM', this.cismvm.inclusionResolver);
  }
  */
}
