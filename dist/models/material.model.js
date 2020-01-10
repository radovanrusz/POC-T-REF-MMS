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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
let Material = class Material extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'string',
        length: 10,
        scale: 3,
        db2: { columnName: 'HMOTNOST', dataType: 'DECIMAL', dataLength: 10, dataPrecision: undefined, dataScale: 3, nullable: 'Y' },
    }),
    __metadata("design:type", String)
], Material.prototype, "hmotnost", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: false,
        length: 4,
        precision: 4,
        scale: 0,
        id: 1,
        db2: { columnName: 'ID', dataType: 'INTEGER', dataLength: 4, dataPrecision: 4, dataScale: 0, nullable: 'N' },
    }),
    __metadata("design:type", Number)
], Material.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        length: 12,
        db2: { columnName: 'KMAT', dataType: 'VARCHAR', dataLength: 12, nullable: 'Y' },
    }),
    __metadata("design:type", String)
], Material.prototype, "kmat", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        length: 10,
        db2: { columnName: 'MNOZSTVI', dataType: 'DECIMAL', dataLength: 10, dataPrecision: 10, dataScale: 3, nullable: 'Y' },
    }),
    __metadata("design:type", String)
], Material.prototype, "mnozstvi", void 0);
__decorate([
    repository_1.property({
        type: 'STRING',
        length: 3,
        db2: { columnName: 'MVM', dataType: 'CHAR', dataLength: 3, nullable: 'N' },
    }),
    __metadata("design:type", String)
], Material.prototype, "mvm", void 0);
Material = __decorate([
    repository_1.model({ settings: { idInjection: false, db2: { schema: 'DB2INST1', table: 'MATERIAL' } } }),
    __metadata("design:paramtypes", [Object])
], Material);
exports.Material = Material;
//# sourceMappingURL=material.model.js.map