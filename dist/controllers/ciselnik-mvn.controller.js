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
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CiselnikMvnController = class CiselnikMvnController {
    constructor(cismvmRepository) {
        this.cismvmRepository = cismvmRepository;
    }
    async create(cismvm) {
        return this.cismvmRepository.create(cismvm);
    }
    async count(where) {
        return this.cismvmRepository.count(where);
    }
    async find(filter) {
        return this.cismvmRepository.find(filter);
    }
    async updateAll(cismvm, where) {
        return this.cismvmRepository.updateAll(cismvm, where);
    }
    async findById(id, filter) {
        return this.cismvmRepository.findById(id, filter);
    }
    async updateById(id, cismvm) {
        await this.cismvmRepository.updateById(id, cismvm);
    }
    async replaceById(id, cismvm) {
        await this.cismvmRepository.replaceById(id, cismvm);
    }
    async deleteById(id) {
        await this.cismvmRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/cismvms', {
        responses: {
            '200': {
                description: 'Cismvm model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Cismvm) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cismvm, {
                    title: 'NewCismvm',
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Cismvm]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "create", null);
__decorate([
    rest_1.get('/cismvms/count', {
        responses: {
            '200': {
                description: 'Cismvm model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Cismvm))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "count", null);
__decorate([
    rest_1.get('/cismvms', {
        responses: {
            '200': {
                description: 'Array of Cismvm model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Cismvm, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Cismvm))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "find", null);
__decorate([
    rest_1.patch('/cismvms', {
        responses: {
            '200': {
                description: 'Cismvm PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cismvm, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Cismvm))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Cismvm, Object]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/cismvms/{id}', {
        responses: {
            '200': {
                description: 'Cismvm model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Cismvm, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Cismvm))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "findById", null);
__decorate([
    rest_1.patch('/cismvms/{id}', {
        responses: {
            '204': {
                description: 'Cismvm PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Cismvm, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Cismvm]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "updateById", null);
__decorate([
    rest_1.put('/cismvms/{id}', {
        responses: {
            '204': {
                description: 'Cismvm PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, models_1.Cismvm]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/cismvms/{id}', {
        responses: {
            '204': {
                description: 'Cismvm DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.string('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CiselnikMvnController.prototype, "deleteById", null);
CiselnikMvnController = __decorate([
    __param(0, repository_1.repository(repositories_1.CismvmRepository)),
    __metadata("design:paramtypes", [repositories_1.CismvmRepository])
], CiselnikMvnController);
exports.CiselnikMvnController = CiselnikMvnController;
//# sourceMappingURL=ciselnik-mvn.controller.js.map