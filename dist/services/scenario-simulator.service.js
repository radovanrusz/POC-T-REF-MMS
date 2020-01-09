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
const core_1 = require("@loopback/core");
let ScenarioSimulatorService = class ScenarioSimulatorService {
    constructor( /* Add @inject to inject parameters */) {
        this.calcScenario = function (id, kmat, mvm, hmotnost, mnozstvi) {
            let scenario = 0;
            if (mnozstvi) {
                console.log('mnozstvi present');
                scenario = 1;
            }
            ;
            scenario *= 2;
            if (hmotnost) {
                console.log('hmotnost present');
                scenario += 1;
            }
            ;
            scenario *= 2;
            if (mvm) {
                console.log('mvm present');
                scenario += 1;
            }
            ;
            scenario *= 2;
            if (kmat) {
                console.log('kmat present');
                scenario += 1;
            }
            ;
            scenario *= 2;
            if (id) {
                console.log('id present');
                scenario += 1;
            }
            ;
            console.log('Scenario identified: ' + scenario);
            return scenario;
        };
    }
};
ScenarioSimulatorService = __decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    __metadata("design:paramtypes", [])
], ScenarioSimulatorService);
exports.ScenarioSimulatorService = ScenarioSimulatorService;
//# sourceMappingURL=scenario-simulator.service.js.map