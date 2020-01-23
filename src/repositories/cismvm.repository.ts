import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Cismvm, CismvmRelations, Material} from '../models';
import {Db2DataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MaterialRepository} from './material.repository';

export class CismvmRepository extends DefaultCrudRepository<
  Cismvm,
  typeof Cismvm.prototype.mvm,
  CismvmRelations
> {

  public readonly materials: HasManyRepositoryFactory<Material, typeof Cismvm.prototype.mvm>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('MaterialRepository') protected materialRepositoryGetter: Getter<MaterialRepository>,
  ) {
    super(Cismvm, dataSource);
    this.materials = this.createHasManyRepositoryFactoryFor('materials', materialRepositoryGetter,);
    this.registerInclusionResolver('materials', this.materials.inclusionResolver);
  }
}
