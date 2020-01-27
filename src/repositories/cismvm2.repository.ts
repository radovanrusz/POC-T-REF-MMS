import { DefaultCrudRepository } from '@loopback/repository';

/* TZ: puvodni auto generovani, konflikt s DB2 repo
import {Cismvm2, Cismvm2Relations} from '../models';
*/
import { Cismvm2, Cismvm2Relations } from '../models/cismvm2.model';

import { PgDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class Cismvm2Repository extends DefaultCrudRepository<
  Cismvm2,
  typeof Cismvm2.prototype.mvm,

  Cismvm2Relations
  > {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(Cismvm2, dataSource);
  }
}
