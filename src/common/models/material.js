const kafka = require('../../kafka/kafka');
const sc = require('../../common/scenario');

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

  Material.doPut = function (id, kmat, mvm, hmotnost, mnozstvi, cb) {
    console.log('mms/put invoked with id: '+id+'kmat:'+kmat+', mvm:'+mvm+', hmotnost:'+hmotnost+', mnozstvi:'+mnozstvi);
    // calculate scenario code; TODO: move to separate fuction
    var scenario = sc.calcScenario(id, kmat, mvm, hmotnost, mnozstvi);
    // TODO: perform validity chks
    // ...
    // processing scenarios
    switch(scenario) {
      case sc.SC_REGISTER_NEW:
        var newMat = { "kmat": kmat, "mvm": mvm, "hmotnost": hmotnost, "mnozstvi": mnozstvi };
        console.log('Registering new item ' + JSON.stringify(newMat) + ' ...');
        
        Material.create(newMat, function(err,obj) {
          if (err) {
            return err;
          }
          console.log("Created row with id: " + obj.id);
          console.log("Sending kafka event ...")
          kafka.sendEvent(id, kmat, mvm, hmotnost, mnozstvi, obj, cb);
        });
        break;
      case sc.SC_UPD_KMAT:
        // code block
        console.log('Updating kmat to ' + kmat + ' for id ' + id);
        // TODO:
        break;
      default:
        // code block
        console.log("Invalid or unknown scenario!")
    }
    /*
    if (scenario == sc.SC_MASS_UPDATE) {  // update hmotnost pres vsechny sklady
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
    */
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
      {arg: 'id', type: 'number'},
      {arg: 'kmat', type: 'string'},
      {arg: 'mvm', type: 'string'},
      {arg: 'hmotnost', type: 'number'},
      {arg: 'mnozstvi', type: 'number'}
    ],
    returns: {arg: 'msg', type: 'string'},
    http: {path: '/mms', verb: 'put'}
  });

};

