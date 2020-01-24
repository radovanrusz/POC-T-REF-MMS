"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const models_1 = require("../models");
const datasources_1 = require("../datasources");
const core_1 = require("@loopback/core");
let MaterialRepository = class MaterialRepository extends repository_1.DefaultCrudRepository {
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
    constructor(dataSource, cismvm2RepositoryGetter) {
        super(models_1.Material, dataSource);
        this.cismvm2RepositoryGetter = cismvm2RepositoryGetter;
        this.cismvm2 = this.createBelongsToAccessorFor('MVM', cismvm2RepositoryGetter);
        this.registerInclusionResolver('MVM', this.cismvm2.inclusionResolver);
    }
};
MaterialRepository = __decorate([
    __param(0, core_1.inject('datasources.db2')), __param(1, repository_1.repository.getter('Cismvm2Repository')),
    __metadata("design:paramtypes", [datasources_1.Db2DataSource, Function])
], MaterialRepository);
exports.MaterialRepository = MaterialRepository;
//# sourceMappingURL=material.repository.js.map