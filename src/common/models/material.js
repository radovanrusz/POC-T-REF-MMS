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
    // perform validity chks
    if (hmotnost && hmotnost<0) {
      cb(null,{"msg": "Cannot update nor transfre negative hmotnost!"});
      return;
    };
    if (mnozstvi && mnozstvi<0) {
      cb(null,{"msg": "Cannot update nor transfre negative mnozstvi!"});
      return;
    }
    // ... hmotnost is null or >0; the same for mnozstvi
    // processing scenarios
    switch(scenario) {
      case sc.SC_NOTHING2UPDATE:
          cb(null,{"msg": "Nothing to update!"});
        break;
      case sc.SC_REGISTER_NEW:
        Material.createNew(kmat, mvm, hmotnost, mnozstvi, cb);
        break;
      case sc.SC_UPD_KMAT:
        var updateData = { "kmat": kmat };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UPD_HMOT:
        var updateData = { "hmotnost": hmotnost };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UPD_KMAT_HMOT:
        var updateData = { "kmat": kmat, "hmotnost": hmotnost };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UPD_MNOZ:
        var updateData = { "mnozstvi": mnozstvi };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UPD_HMOT_MNOZ:
        var updateData = { "hmotnost": hmotnost, "mnozstvi": mnozstvi };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UPD_KMAT_HMOT_MNOZ:
        var updateData = { "kmat": kmat, "hmotnost": hmotnost, "mnozstvi": mnozstvi };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UPD_KMAT_MNOZ:
        var updateData = { "kmat": kmat, "mnozstvi": mnozstvi };
        Material.updateById(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM:
        var updateData = null;
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_KMAT:
        var updateData = { "kmat": kmat };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_HMOT:
        var updateData = { "hmotnost": hmotnost };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_KMAT_HMOT:
        var updateData = { "kmat": kmat, "hmotnost": hmotnost };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_MNOZ:
        var updateData = { "mnozstvi": mnozstvi };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_KMAT_MNOZ:
        var updateData = { "kmat": kmat, "mnozstvi": mnozstvi };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_HMOT_MNOZ:
        var updateData = { "hmotnost": hmotnost, "mnozstvi": mnozstvi };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      case sc.SC_UOM_KMAT_HMOT_MNOZ:
        var updateData = { "kmat": kmat, "hmotnost": hmotnost, "mnozstvi": mnozstvi };
        Material.uOM(id, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
        break;
      default:
        console.log('Invalid scenario!');
        cb(null,{"msg": "Invalid scenario!"});
    }
  };

  Material.listAll = function(cb) {
    console.log('listAll invoked ...');
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

  // helper methods
  Material.createNew = function (kmat, mvm, hmotnost, mnozstvi, cb) {
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
  }


  Material.updateById = function (id, kmat, mvm, hmotnost, mnozstvi,updateData,cb) {
    console.log('Updating ' + JSON.stringify(updateData) + ' for id ' + id);
    Material.findById(id,{}, function(err, inst) {
      if (err) {
        console.log('Err. findById fired: ' + JSON.stringify(err));
        cb(err);
        return err;
      }
      console.log('Found instance to update ' + JSON.stringify(inst));
      inst.updateAttributes(updateData, function(err, uinst) {
        if (err) {
          console.log('Error when updating material instance: ' + JSON.stringify(err));
          cb(err);
          return err;
        }
        console.log('Updated record: ' + JSON.stringify(uinst));
        kafka.sendEvent(id, kmat, mvm, hmotnost, mnozstvi, uinst, cb);
      });
    });
  };

  Material.updateInst = function(inst, kmat, mvm, hmotnost, mnozstvi, updateData, cb) {
    if (updateData) {
      console.log('Updating ' + JSON.stringify(updateData) + ' for id ' + inst.id);
      inst.updateAttributes(updateData, function(err, uinst) {
        if (err) {
          console.log('Error when updating material instance: ' + JSON.stringify(err));
          cb(err);
          return err;
        }
        console.log('Updated record: ' + JSON.stringify(uinst));
        kafka.sendEvent(inst.id, kmat, mvm, hmotnost, mnozstvi, uinst, cb);
      });
    } else {
      console.log('Nothing to update!');
      cb(null,{"msg": "Nothing to update!"});
    }
  };

  Material.uOM = function (id, kmat, mvm, hmotnost, mnozstvi, updateData, cb) {
    Material.findById(id,{}, function(err, inst) {
      if (err) {
        console.log('Err. findById fired: ' + JSON.stringify(err));
        cb(err);
        return err;
      }
      console.log('Found instance to work with ' + JSON.stringify(inst));
      if (inst.mvm == mvm) { // update scenario (nothing to do in this particular case) 
        Material.updateInst(inst, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
      } else {  // move scenario
        if (hmotnost && mnozstvi) {
          cb(null,{"msg": "Cannot transfer by both hmotnost and mnozstvi!"});  
        } else {
          if (hmotnost) {  // move by hmotnost
            if(hmotnost>inst.hmotnost) {
              cb(null,{"msg": "Hmotnost required to transfer(" + hmotnost + ") is greater than hmotnost present in selected record (" + inst.hmotnost + ")!"});  
            } else {
              if (hmotnost == inst.hmotnost) {  // move whole record
                var updateData = { "mvm": mvm };
                Material.updateInst(inst, kmat, mvm, hmotnost, mnozstvi, updateData, cb);  
              } else {  // update existing record and create new one
                // chk kmat
                if (kmat && kmat != inst.kmat) {
                  cb(null,{"msg": "Cannot change kmat during transfer!"});
                  return;  
                };
                var transMnoz = hmotnost * inst.mnozstvi / inst.hmotnost;
                console.log('Transferring hmotnost: ' + hmotnost + ' (mnozstvi: ' + transMnoz + ') of kmat: ' + inst.kmat + ' from ' + inst.mvm + ' to ' + mvm);
                // TODO: update and insert
                /*
                for update : inst,inst.hmotnost-hmotnost, inst.mnozstvi-transMnoz
                for insert : inst.kmat, mvn, hmotnost, transMnoz
                for kafka : id, kmat, mvn, hmotnost, mnozstvi
                */
                cb(null,{"msg": "Scenario not implemented yet!"});
              }
            }
          } else  {  // move by mnozstvi
            if (mnozstvi>inst.mnozstvi) {
              cb(null,{"msg": "Mnozstvi required to transfer(" + mnozstvi + ") is greater than mnozstvi present in selected record (" + inst.mnozstvi + ")!"});  
            } else {
              if (mnozstvi == inst.mnozstvi) {  // move whole record
                var updateData = { "mvm": mvm };
                Material.updateInst(inst, kmat, mvm, hmotnost, mnozstvi, updateData, cb);
              } else {  // update existing record and create new one
                // chk kmat
                if (kmat && kmat != inst.kmat) {
                  cb(null,{"msg": "Cannot change kmat during transfer!"});
                  return;  
                };
                var transHmot = mnozstvi * inst.hmotnost / inst.mnozstvi;
                console.log('Transferring mnozstvi: ' + mnozstvi + ' (hmotnost: ' + transHmot + ') of kmat: ' + inst.kmat + ' from ' + inst.mvm + ' to ' + mvm);
                // TODO: update and insert
                /*
                for update : inst,inst.hmotnost-transHmot, inst.mnozstvi-mnozstvi
                for insert : inst.kmat, mvn, transHmot, mnozstvi
                for kafka : id, kmat, mvn, hmotnost, mnozstvi
                */
                cb(null,{"msg": "Scenario not implemented yet!"});
              }
            }
          }
        }
      }
    });
  }

};

