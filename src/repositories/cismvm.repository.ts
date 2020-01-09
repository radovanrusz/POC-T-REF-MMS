import {DefaultCrudRepository} from '@loopback/repository';
import {Cismvm, CismvmRelations} from '../models';
import {Db2DataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CismvmRepository extends DefaultCrudRepository<
  Cismvm,
  typeof Cismvm.prototype.mvm,
  CismvmRelations
> {
  constructor(
    @inject('datasources.db2') dataSource: Db2DataSource,
  ) {
    super(Cismvm, dataSource);
  }
}
