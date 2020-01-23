import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Material, MaterialRelations, Cismvm } from '../models';
import { Db2DataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { CismvmRepository } from './cismvm.repository';

export class MaterialRepository extends DefaultCrudRepository<
  Material,
  typeof Material.prototype.mvm,
  MaterialRelations
  > {

  public readonly cismvm: BelongsToAccessor<Cismvm, typeof Material.prototype.mvm>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('CismvmRepository') protected cismvmRepositoryGetter: Getter<CismvmRepository>,
  ) {
    super(Material, dataSource);
    this.cismvm = this.createBelongsToAccessorFor('MVM', cismvmRepositoryGetter);
    this.registerInclusionResolver('cismvm', this.cismvm.inclusionResolver);
  }
}
