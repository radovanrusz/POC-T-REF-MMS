module.exports.SC_NOTHING2UPDATE = 1;      // nothing to update
module.exports.SC_UPD_KMAT = 3;            // update kmat
module.exports.SC_UOM = 5;                 // update or move
module.exports.SC_UOM_KMAT= 7;             // update or move kmat
module.exports.SC_UPD_HMOT = 9;            // update hmotnost
module.exports.SC_UPD_KMAT_HMOT = 11;      // update kmat and hmotnost
module.exports.SC_UOM_HMOT = 13;           // update or move hmmot
module.exports.SC_UOM_KMAT_HMOT = 15;      // update or move kmat, hmotnost
module.exports.SC_UPD_MNOZ = 17;           // update mnozstvi
module.exports.SC_UPD_KMAT_MNOZ = 19;      // update kmat, mnozstvi
module.exports.SC_UOM_MNOZ = 21;           // update or move mnozstvi
module.exports.SC_UOM_KMAT_MNOZ = 23;      // update or move kmat, mnozstvi
module.exports.SC_UPD_HMOT_MNOZ = 25;      // update hmotnost, mnozstvi
module.exports.SC_UPD_KMAT_HMOT_MNOZ = 27; // update kmat, hmotnost, mnozstvi
module.exports.SC_UOM_HMOT_MNOZ = 29;      // update or move hmotnost, mnozstvi
module.exports.SC_REGISTER_NEW = 30;       // insert new record
module.exports.SC_UOM_KMAT_HMOT_MNOZ = 31; // update or move kmat, hmotnost, mnozstvi

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