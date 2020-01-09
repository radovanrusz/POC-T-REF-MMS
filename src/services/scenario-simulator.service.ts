import { bind, /* inject, */ BindingScope } from '@loopback/core';

@bind({ scope: BindingScope.TRANSIENT })
export class ScenarioSimulatorService {
  constructor(/* Add @inject to inject parameters */) { }

  calcScenario = function (id: number, kmat: string, mvm: string, hmotnost: number, mnozstvi: number) {
    let scenario = 0;
    if (mnozstvi) {
      console.log('mnozstvi present');
      scenario = 1;
    };
    scenario *= 2;
    if (hmotnost) {
      console.log('hmotnost present');
      scenario += 1;
    };
    scenario *= 2;
    if (mvm) {
      console.log('mvm present');
      scenario += 1;
    };
    scenario *= 2;
    if (kmat) {
      console.log('kmat present');
      scenario += 1;
    };
    scenario *= 2;
    if (id) {
      console.log('id present');
      scenario += 1;
    };
    console.log('Scenario identified: ' + scenario);
    return scenario;
  };



}
