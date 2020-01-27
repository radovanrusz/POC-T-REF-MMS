import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { Material2, Material2Relations } from '../models/material2.model';
import { Cismvm } from '../models/cismvm.model';
import { Db2DataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { CismvmRepository } from './cismvm.repository';

export class Material2Repository extends DefaultCrudRepository<
  Material2,
  typeof Material2.prototype.id,
  Material2Relations
  > {

  //TZ: zmenit na string
  public readonly cismvm2: BelongsToAccessor<Cismvm, typeof Cismvm.prototype.id>;

  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource, @repository.getter('CismvmRepository') protected cismvm2RepositoryGetter: Getter<CismvmRepository>,
  ) {
    super(Material2, dataSource);
    /*
    TZ: Musi byt existujici pole v DB2 (do nej se dava vlozeny objekt z "parent" tabulky s realnym/virtualnim "PK")
    Nemusi byt PK/FK vazba - velmi pravdepodobne se nepouziva pri sql dotazech
    */
    this.cismvm2 = this.createBelongsToAccessorFor('MVM', cismvm2RepositoryGetter);
    this.registerInclusionResolver('MVM', this.cismvm2.inclusionResolver);
  }
}
