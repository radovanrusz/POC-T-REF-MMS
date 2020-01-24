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
let MaterialStandardController = class MaterialStandardController {
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }
    async create(material) {
        return this.materialRepository.create(material);
    }
    async count(where) {
        return this.materialRepository.count(where);
    }
    async find(filter) {
        const result0 = this.materialRepository.find({ include: [{ relation: 'MVM' }] });
        console.log(JSON.stringify(result0));
        const result1 = this.materialRepository.find(filter);
        console.log(JSON.stringify(result1));
        return result0;
    }
    async updateAll(material, where) {
        return this.materialRepository.updateAll(material, where);
    }
    async findById(id, filter) {
        return this.materialRepository.findById(id, filter);
    }
    async updateById(id, material) {
        await this.materialRepository.updateById(id, material);
    }
    async replaceById(id, material) {
        await this.materialRepository.replaceById(id, material);
    }
    async deleteById(id) {
        await this.materialRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/materials', {
        responses: {
            '200': {
                description: 'Material model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Material) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Material, {
                    title: 'NewMaterial',
                    exclude: ['id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "create", null);
__decorate([
    rest_1.get('/materials/count', {
        responses: {
            '200': {
                description: 'Material model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Material))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "count", null);
__decorate([
    rest_1.get('/materials', {
        responses: {
            '200': {
                description: 'Array of Material model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Material, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Material))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "find", null);
__decorate([
    rest_1.patch('/materials', {
        responses: {
            '200': {
                description: 'Material PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Material, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Material))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Material, Object]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/materials/{id}', {
        responses: {
            '200': {
                description: 'Material model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Material, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Material))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "findById", null);
__decorate([
    rest_1.patch('/materials/{id}', {
        responses: {
            '204': {
                description: 'Material PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Material, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Material]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "updateById", null);
__decorate([
    rest_1.put('/materials/{id}', {
        responses: {
            '204': {
                description: 'Material PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Material]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/materials/{id}', {
        responses: {
            '204': {
                description: 'Material DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MaterialStandardController.prototype, "deleteById", null);
MaterialStandardController = __decorate([
    __param(0, repository_1.repository(repositories_1.MaterialRepository)),
    __metadata("design:paramtypes", [repositories_1.MaterialRepository])
], MaterialStandardController);
exports.MaterialStandardController = MaterialStandardController;
//# sourceMappingURL=material-standard.controller.js.map