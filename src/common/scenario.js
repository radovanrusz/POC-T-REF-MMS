
module.exports.SC_REGISTER_NEW = 30; // insert new record
module.exports.SC_UPD_KMAT = 3;
//TODO: define constants according valid scenarios

module.exports.calcScenario = function (id, kmat, mvm, hmotnost, mnozstvi) {
    var scenario = 0;
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
}