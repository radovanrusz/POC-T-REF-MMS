'use strict';
const kafka = require('../../kafka/kafka');
const sc = require('../scenario');
var Promise = require('promise');

module.exports = function(Material) {
    Material.listAll = function(cb) {
        console.log('listAll invoked ...');
        Material.find({}, cb);
    };

    Material.findBy = function(kmat, mvm, limit, cb) {
        console.log(
            'mms/get invoked with kmat:', kmat,
            ', mvm:', mvm,
            ', limit:', limit,
            '  and callBack: ' + cb
        );
        var whereClause = {};
        if (kmat && mvm) {
            var andClause = [];
            andClause.push({'kmat': {'eq': kmat}});
            andClause.push({'mvm': {'eq': mvm}});
            whereClause.and = andClause;
        } else {
            if (kmat) {
                whereClause = {'kmat': {'eq': kmat}};
            }
            if (mvm) {
                whereClause = {'mvm': {'eq': mvm}};
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
        Material.find(filter, cb);
    };

    Material.resp = [];

    Material.doPut = function(req, cb) {
        Material.resp = [];
        var trigCnt = req.length;
        console.log('Received ' + trigCnt + ' items');
        console.log(JSON.stringify(req));
        var cnt = 0;
        var respCnt = 0;
        req.forEach(function(item) {
            cnt++;
            console.log(
                'Processing request item[', cnt, ']: id:', item.id,
                ', kmat:', item.kmat,
                ', mvm:', item.mvm,
                ', hmotnost:', item.hmotnost,
                ', mnozstvi:', item.mnozstvi
            );
            Material.doSinglePut(item.id, item.kmat, item.mvm, item.hmotnost, item.mnozstvi)
            .then(function(inst) {
                console.log('Resulting record instance: ' + JSON.stringify(inst));
                Material.resp.push(inst);
                respCnt++;
                console.log(
                    'respCnt: ', respCnt,
                    'resp so far: ', JSON.stringify(Material.resp)
                );
                if (respCnt == req.length) {
                    console.log('Response completed: ' + JSON.stringify(Material.resp));
                    cb(null, Material.resp);
                }
            });
        });
    };

    Material.doSinglePut = function(id, kmat, mvm, hmotnost, mnozstvi) {
        return new Promise(function(resolve, reject) {
            console.log(
                'mms/put invoked with id: ', id,
                'kmat:', kmat,
                ', mvm:', mvm,
                ', hmotnost:', hmotnost,
                ', mnozstvi:' + mnozstvi
            );
            // calculate scenario code; TODO: move to separate fuction
            var scenario = sc.calcScenario(id, kmat, mvm, hmotnost, mnozstvi);
            // perform validity chks
            if (hmotnost && hmotnost < 0) {
                // cb(null,{"msg": "Cannot update nor transfer negative hmotnost!"});
                reject({'msg': 'Cannot update nor transfer negative hmotnost!'});
            };
            if (mnozstvi && mnozstvi < 0) {
                // cb(null,{"msg": "Cannot update nor transfer negative mnozstvi!"});
                reject({'msg': 'Cannot update nor transfer negative mnozstvi!'});
            }

            var workflow = sc.FLOW_NOTHING;
            var updateData = null;
            var insertData = null;
            // processing scenarios, determining wrkflow
            switch (scenario) {
            case sc.SC_NOTHING2UPDATE:
                console.log('Nothing to update. Doing nothing.');
                break;
            case sc.SC_REGISTER_NEW:
                workflow = sc.FLOW_CS;
                break;
            case sc.SC_UPD_KMAT:
                updateData = {'kmat': kmat};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UPD_HMOT:
                updateData = {'hmotnost': hmotnost};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UPD_KMAT_HMOT:
                updateData = {'kmat': kmat, 'hmotnost': hmotnost};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UPD_MNOZ:
                updateData = {'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UPD_HMOT_MNOZ:
                updateData = {'hmotnost': hmotnost, 'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UPD_KMAT_HMOT_MNOZ:
                updateData = {'kmat': kmat, 'hmotnost': hmotnost, 'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UPD_KMAT_MNOZ:
                updateData = {'kmat': kmat, 'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FUS;
                break;
            case sc.SC_UOM:
                updateData = null;
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_KMAT:
                updateData = {'kmat': kmat};
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_HMOT:
                updateData = {'hmotnost': hmotnost};
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_KMAT_HMOT:
                updateData = {'kmat': kmat, 'hmotnost': hmotnost};
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_MNOZ:
                updateData = {'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_KMAT_MNOZ:
                updateData = {'kmat': kmat, 'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_HMOT_MNOZ:
                updateData = {'hmotnost': hmotnost, 'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FLUCS;
                break;
            case sc.SC_UOM_KMAT_HMOT_MNOZ:
                updateData = {'kmat': kmat, 'hmotnost': hmotnost, 'mnozstvi': mnozstvi};
                workflow = sc.FLOW_FLUCS;
                break;
            default:
                console.log('Invalid scenario!');
                // cb(null,{"msg": "Invalid scenario!"});
                reject({'msg': 'Invalid scenario!'});
            } // end switch(scenario)

            // executing wrkflows
            switch (workflow) {
            case sc.FLOW_NOTHING:
                // cb(null,{"msg": "Nothing to update!"});
                reject({'msg': 'Nothing to update!'});
                break;
            case sc.FLOW_CS:
                return Material.createNew(kmat, mvm, hmotnost, mnozstvi)
                .then(function(inst) {
                    kafka.sendEventP(
                        inst.id,
                        inst.kmat,
                        null,
                        inst.mvm,
                        inst.hmotnost,
                        inst.mnozstvi,
                        inst
                    );
                    resolve(inst);
                });
                break;
            case sc.FLOW_FUS:
                return Material.findInst(id)
                .then(function(inst) {
                    return Material.updateInst(inst, updateData);
                })
                .then(function(inst) {
                    kafka.sendEventP(inst.id, kmat, inst.mvm, mvm, hmotnost, mnozstvi, inst);
                    resolve(inst);
                })
                .catch(function(err) {
                    console.log('Scenario ', scenario, ' catched error: ', err);
                    reject(err);
                    // cb(err);
                });
                break;
            case sc.FLOW_FLUCS:
                return Material.findInst(id)
                .then(function(inst) {
                    // perform logic; result will influence next steps
                    return Material.doLogic(inst, kmat, mvm, hmotnost, mnozstvi, updateData);
                })
                .then(function(resp) {
                    // calc updateData
                    updateData = resp.updateData;
                    console.log('udateData: ' + JSON.stringify(updateData));
                    // calc insertData
                    insertData = resp.insertData;
                    console.log('insertData: ' + JSON.stringify(insertData));
                    if (updateData) {
                        return Material.updateInst(resp.inst, updateData);
                    } else { return resp.inst; };
                })
                .then(function(inst) {
                    if (insertData) { // optionally perform create step
                        return Material.createNew(
                            insertData.kmat,
                            insertData.mvm,
                            insertData.hmotnost,
                            insertData.mnozstvi
                        );
                    } else { return inst; }
                })
                .then(function(inst) {
                    if (updateData || insertData) {
                        kafka.sendEventP(inst.id, kmat, inst.mvm, mvm, hmotnost, mnozstvi, inst);
                        resolve(inst);
                    } else {
                        console.log('No update or insert, send kafka event skipped.');
                        // cb(null,{"msg": "Nothing to update!"});
                        reject({'msg': 'Nothing to update!'});
                    }
                })
                .catch(function(err) {
                    console.log('Scenario ', scenario, ' catched error: ', err);
                    reject(err);
                    // cb(err);
                });
                break;
            default:
                console.log('Unknown workflow!');
                // cb(null,{"msg": "Unknown workflow!"});
                reject({'msg': 'Unknown workflow!'});
            } // end switch(workflow)
        });
    };

    Material.remoteMethod('findBy', {
        accepts: [
            {arg: 'kmat', type: 'string'},
            {arg: 'mvm', type: 'string'},
            {arg: 'limit', type: 'number'}
        ],
        returns: {
            arg: 'materials',
            type: ['object']
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
            {arg: 'req', type: 'array', http: {source: 'body'}}
            // {arg: 'id', type: 'number'},
            // {arg: 'kmat', type: 'string'},
            // {arg: 'mvm', type: 'string'},
            // {arg: 'hmotnost', type: 'number'},
            // {arg: 'mnozstvi', type: 'number'}
        ],
        returns: {arg: 'msg', type: 'array'},
        http: {path: '/mms', verb: 'put'}
    });

    // ========================================================================
    // New Helper methods
    // ========================================================================
    Material.createNew = function(kmat, mvm, hmotnost, mnozstvi) {
        return new Promise(function(resolve, reject) {
            var newMat = {'kmat': kmat, 'mvm': mvm, 'hmotnost': hmotnost, 'mnozstvi': mnozstvi};
            console.log('Registering new item ' + JSON.stringify(newMat) + ' ...');
            Material.create(newMat, function(err, inst) {
                if (err) {
                    reject(err);
                }
                console.log('Created row with id: ' + inst.id);
                resolve(inst);
            });
        });
    };

    Material.findInst = function(id) {
        return new Promise(function(resolve, reject) {
            console.log('Seeking instance by id: ' + id);
            Material.findById(id, {}, function(err, inst) {
                if (err) {
                    console.log('Err. findById fired: ' + JSON.stringify(err));
                    reject(err);
                }
                console.log('Found instance to process ' + JSON.stringify(inst));
                return resolve(inst);
            });
        });
    };

    Material.updateInst = function(inst, updateData) {
        return new Promise(function(resolve, reject) {
            if (updateData) {
                console.log('Updating instance by ' + JSON.stringify(updateData) + ' for id ' + inst.id);
                inst.updateAttributes(updateData, function(err, inst) {
                    if (err) {
                        console.log('Error when updating material instance: ' + JSON.stringify(err));
                        reject(err);
                    }
                    console.log('Updated record: ' + JSON.stringify(inst));
                    resolve(inst);
                });
            } else {
                console.log('Nothing to update!');
                reject({'msg': 'Nothing to update!'});
                // ??? resolve {"msg": "Nothing to update!"};
            }
        });
    };
    // how to get updateData & createData back???
    Material.doLogic = function(inst, kmat, mvm, hmotnost, mnozstvi, updateData) {
        return new Promise(function(resolve, reject) {
            var resp = {'insertData': null, 'updateData': null, 'inst': inst};
            if (inst.mvm == mvm) {
                resp.updateData = updateData;
                resolve(resp);
            }
            if (hmotnost && mnozstvi) {
                reject({'msg': 'Cannot transfer by both hmotnost and mnozstvi!'});
            }
            if (kmat && kmat != inst.kmat) {
                reject({'msg': 'Cannot change kmat during transfer!'});
            }
            if (hmotnost > inst.hmotnost || mnozstvi > inst.mnozstvi) {
                reject({'msg': 'Cannot transfer greater hmotnost/mnozstvi than present in stock!'});
            }
            if (hmotnost == inst.hmotnost || mnozstvi == inst.mnozstvi) {  // move whole record
                resp.updateData = updateData;
                resp.updateData.mvm = mvm;  // add mvm to  update clause
            } else { // update existing record and create new one
                resp.updateData = {};
                resp.insertData = {'kmat': inst.kmat, 'mvm': mvm};
                if (hmotnost) {  // move by hmotnost
                    var transMnoz = hmotnost * inst.mnozstvi / inst.hmotnost;
                    resp.updateData.hmotnost = inst.hmotnost - hmotnost;
                    resp.updateData.mnozstvi = inst.mnozstvi - transMnoz;
                    // insertData
                    resp.insertData.hmotnost = hmotnost;
                    resp.insertData.mnozstvi = transMnoz;
                } else {  // move by mnozstvi
                    var transHmot = mnozstvi * inst.hmotnost / inst.mnozstvi;
                    resp.updateData.mnozstvi = inst.mnozstvi - mnozstvi;
                    resp.updateData.hmotnost = inst.hmotnost - transHmot;
                    // insertData
                    resp.insertData.hmotnost = transHmot;
                    resp.insertData.mnozstvi = mnozstvi;
                }
                console.log('Transfer data: ' + JSON.stringify(resp));
            }
            resolve(resp);
        });
    }; // doLogic
}; // function(Material)
