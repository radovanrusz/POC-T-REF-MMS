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
const services_1 = require("../services");
const services_2 = require("../services");
//import { inject } from '@loopback/context';
const core_1 = require("@loopback/core");
let MaterialPostWithKafkaSubmitController = class MaterialPostWithKafkaSubmitController {
    constructor(materialRepository, scenarioSimulator, kafkaClientServices) {
        this.materialRepository = materialRepository;
        this.scenarioSimulator = scenarioSimulator;
        this.kafkaClientServices = kafkaClientServices;
    }
    async create(material) {
        console.log(`C: running post with incoming material: ${JSON.stringify(material)}`);
        const { id, kmat, mvm, hmotnost, mnozstvi } = material;
        //Business logika je externalizovana do sdilene sluzby pouzitelne ve vice controllerech
        const scenario = this.scenarioSimulator.calcScenario(id, kmat, mvm, hmotnost, mnozstvi);
        console.log(`C picking scenario: ${JSON.stringify(scenario)}`);
        //vytvoreni transakce, timeout pro rollback 3sec
        const tx = await this.materialRepository.beginTransaction({ isolationLevel: repository_1.IsolationLevel.READ_COMMITTED, timeout: 3000 });
        //insert v ramci transakce
        const result1 = await this.materialRepository.create(material, { transaction: tx });
        console.log(`C db update result: ${JSON.stringify(result1)} -> going to commit/rollback`);
        //Prace s Kafka je take externalizovano do sdilene sluzby
        try {
            const result2 = await this.kafkaClientServices.sendEventP(id, kmat, mvm, 'test', hmotnost, mnozstvi);
            console.log(`C kafka submit result: ${JSON.stringify(result2)} -> going to commit`);
            await tx.commit();
            return result1;
        }
        catch (err) {
            console.log(`C kafka submit failure: ${JSON.stringify(err)} -> going to cancel`);
            await tx.rollback();
        }
        return result1;
    }
};
__decorate([
    rest_1.post('/post-material-submit-kafka', {
        responses: {
            '200': {
                description: 'Material successfuly updated, Kafka message sent',
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
], MaterialPostWithKafkaSubmitController.prototype, "create", null);
MaterialPostWithKafkaSubmitController = __decorate([
    __param(0, repository_1.repository(repositories_1.MaterialWithTxRepository)),
    __param(1, core_1.service(services_1.ScenarioSimulatorService)),
    __param(2, core_1.service(services_2.KafkaClientServiceService)),
    __metadata("design:paramtypes", [repositories_1.MaterialWithTxRepository,
        services_1.ScenarioSimulatorService,
        services_2.KafkaClientServiceService])
], MaterialPostWithKafkaSubmitController);
exports.MaterialPostWithKafkaSubmitController = MaterialPostWithKafkaSubmitController;
//# sourceMappingURL=material-post-with-kafka-submit.controller.js.map