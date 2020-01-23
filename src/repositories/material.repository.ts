import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Material, MaterialRelations, Cismvm } from '../models';
import { Db2DataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { CismvmRepository } from './cismvm.repository';

export class MaterialRepository extends DefaultCrudRepository<
  Material,
  typeof String,
  MaterialRelations
  > {

  public readonly cismvm: BelongsToAccessor<Cismvm, typeof String>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('CismvmRepository') protected cismvmRepositoryGetter: Getter<CismvmRepository>,
  ) {
    super(Material, dataSource);
    this.cismvm = this.createBelongsToAccessorFor('MVM', cismvmRepositoryGetter);
    this.registerInclusionResolver('MVM', this.cismvm.inclusionResolver);
  }
}
