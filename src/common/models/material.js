var kafka = require('../../kafka/kafka');

module.exports = function(Material) {
  Material.findBy = function (kmat,mvm,limit,cb) {
    console.log('mms/get invoked with kmat:'+kmat+', mvm:'+mvm+', limit:'+limit+'  and callBack: ' + cb);
    var whereClause = {};
    if (kmat && mvm) {
      andClause = [];
      andClause.push({"kmat": { "eq": kmat}});
      andClause.push({"mvm": { "eq": mvm}});
      whereClause.and = andClause;
    } else {
      var clause = {};
      if (kmat) {
        whereClause = {"kmat": { "eq": kmat}};
      }
      if (mvm) {
        whereClause = {"mvm": { "eq": mvm}};
      }
    }
    var filter = {};
    if (limit) {
      filter.limit = limit;
    }
    if (kmat || mvm) {
      filter.where = whereClause;
    }
    // filter: {"limit":3,"where":{"and":[{"kmat":{"eq":"11111"}},{"mvm":{"eq":"001"}}]}}

    console.log('Resulting filter: ' + JSON.stringify(filter));
    Material.find(filter,cb);
  };

  Material.doPut = function (kmat, mnozstvi, mvmTo, mvmFrom, hmotnost, cb) {
    console.log('mms/put invoked with kmat:'+kmat+', mnozstvi:'+mnozstvi+', mvmTo:'+mvmTo+', mvmFrom:'+mvmFrom+', hmotnost:'+hmotnost);
    // calculate scenario code; TODO: move to separate fuction
    var scenario = 0;
    if (kmat) {
      console.log('kmat present');
      scenario = 1;
    };
    scenario *= 2;
    if (mvmFrom) {
      console.log('mvmFrom present');
      scenario += 1;
    };
    scenario *= 2;
    if (mvmTo) {
      console.log('mvmTo present');
      scenario += 1;
    };
    scenario *= 2;
    if (hmotnost) {
      console.log('hmotnost present');
      scenario += 1;
    };
    scenario *= 2;
    if (mnozstvi) {
      console.log('mnozstvi present');
      scenario += 1;
    };
    console.log('Scenario identified: ' + scenario);
    // processing scenarios
    if (scenario == 18) {  // update hmotnost pres vsechny sklady
      console.log('updating hmotnost of kmat: ' + kmat + ' to: ' + hmotnost);
      var updatedCnt = 0;
      Material.updateAll({"kmat": kmat},{"hmotnost": hmotnost},function(err, info){
        if (err) {
          return err;
        }
        updatedCnt = info.count;
        console.log('Updated ' + updatedCnt + ' rows.');
        //send kafka
        kafka.sendEvent(kmat, mnozstvi, mvmTo, mvmFrom, hmotnost,'Updated ' + updatedCnt + ' rows.',cb);
      });
    }
  };

  Material.listAll = function(cb) {
    console.log('listAll invoked with callBack: ' + cb);
    Material.find({}, cb);
  };

  Material.remoteMethod('findBy', {
    accepts: [
      {arg: 'kmat', type: 'string'},
      {arg: 'mvm', type: 'string'},
      {arg: 'limit', type: 'number'}
    ],
    returns: {
      arg: 'materials',
      type: 'array' 
    },
    http: {
      path: '/mms',
      verb: 'get'
    }
  });

  Material.remoteMethod('listAll', {
    returns: {
      arg: 'materials',
      type: 'array' 
    },
    http: {
      path: '/listall',
      verb: 'get'
    }
  });

  Material.remoteMethod('doPut', {
    accepts: [
      {arg: 'kmat', type: 'string'},
      {arg: 'mnozstvi', type: 'number'},
      {arg: 'mvmTo', type: 'string'},
      {arg: 'mvmFrom', type: 'string'},
      {arg: 'hmotnost', type: 'number'}
    ],
    returns: {arg: 'msg', type: 'string'},
    http: {path: '/mms', verb: 'put'}
  });

};

