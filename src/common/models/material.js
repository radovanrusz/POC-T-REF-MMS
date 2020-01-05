'use strict';
const kafka = require('../../kafka/kafka');
const sc = require('../scenario');
var Promise = require('promise');
var app = require('../../server/server');

module.exports = function(Material) {
    Material.listAll = function(cb) {
        var mDate = new Date();
        var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
        console.log(mDateStr + ': listAll invoked ...');
        Material.find({}, cb);
    };

    Material.findBy = function(kmat, mvm, limit, cb) {
        var mDate = new Date();
        var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
        console.log(mDateStr,
            ': mms/get invoked with kmat:', kmat,
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
        console.log(mDateStr, ': Resulting filter: ' + JSON.stringify(filter));
        Material.find(filter, cb);
    };

    Material.doPut = function(req, cb) {
        var mDate = new Date();
        var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
        Material.resp = [];
        var trigCnt = req.length;
        console.log(mDateStr, ': Received ' + trigCnt + ' items');
        console.log(JSON.stringify(req));
        var cnt = 0;
        var respCnt = 0;
        var promises = [];
        req.forEach(function(item) {
            var mDate = new Date();
            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr,
                ': Processing request item[', cnt, ']: id:', item.id,
                ', kmat:', item.kmat,
                ', mvm:', item.mvm,
                ', hmotnost:', item.hmotnost,
                ', mnozstvi:', item.mnozstvi
            );
            // app.dataSources.db.transaction(
            promises.push(
                Material.doSinglePut(item.id, item.kmat, item.mvm, item.hmotnost, item.mnozstvi)
                    .then(function(inst) {
                        var mDate = new Date();
                        var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                        console.log(mDateStr, ': Resulting record instance: ' + JSON.stringify(inst));
                        return (inst);
                    })
            );
        }); // forEach
        Promise.all(promises).then(function(responses) {
            var mDate = new Date();
            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr, ': Response completed: ' + JSON.stringify(responses));
            cb(null, responses);
        });
    };

    Material.doSinglePut = function(id, kmat, mvm, hmotnost, mnozstvi) {
        return new Promise(function(resolve, reject) {
            var mDate = new Date();
            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr,
                ': mms/put invoked with id: ', id,
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
            let transaction = Material.beginTransaction('READ COMMITTED', function(err, tx) {
                switch (workflow) {
                case sc.FLOW_NOTHING:
                    // cb(null,{"msg": "Nothing to update!"});
                    tx.rollback(function(err) {
                        console.log('Rolled back - just cleaning up the transaction ...');
                    });
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
                            )
                                .then(function(kdata) {
                                    tx.commit(function(err) {
                                        console.log('Committed');
                                    });
                                    resolve(inst);
                                });
                        })
                        .catch(function(err) {
                            var mDate = new Date();
                            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                            console.log(mDateStr, ': Scenario ', scenario, ' catched error: ', err);
                            tx.rollback(function(err) {
                                console.log('Rolled back!');
                            });
                            reject(err);
                        // cb(err);
                        });
                    console.log('Should not get here(1)!');
                    break;
                case sc.FLOW_FUS:
                    return Material.findInst(id)
                        .then(function(inst) {
                            return Material.updateInst(inst, updateData);
                        })
                        .then(function(inst) {
                            kafka.sendEventP(inst.id, kmat, inst.mvm, mvm, hmotnost, mnozstvi, inst)
                                .then(function(kdata) {
                                    tx.commit(function(err) {
                                        var mDate = new Date();
                                        var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                                        console.log(mDateStr, ': Committed');
                                    });
                                    resolve(inst);
                                });
                        })
                        .catch(function(err) {
                            var mDate = new Date();
                            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                            console.log(mDateStr, ': Scenario ', scenario, ' catched error: ', err);
                            tx.rollback(function(err) {
                                console.log('Rolled back!');
                            });
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
                            var mDate = new Date();
                            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                            console.log(mDateStr, ': updateData: ' + JSON.stringify(updateData));
                            // calc insertData
                            insertData = resp.insertData;
                            console.log(mDateStr, ': insertData: ' + JSON.stringify(insertData));
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
                                kafka.sendEventP(inst.id, kmat, inst.mvm, mvm, hmotnost, mnozstvi, inst)
                                    .then(function(kdata) {
                                        tx.commit(function(err) {
                                            var mDate = new Date();
                                            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                                            console.log(mDateStr, ': Committed');
                                        });
                                        resolve(inst);
                                    });
                            } else {
                                var mDate = new Date();
                                var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                                console.log(mDateStr, ': No update or insert, send kafka event skipped.');
                                // cb(null,{"msg": "Nothing to update!"});
                                tx.rollback(function(err) {
                                    var mDate = new Date();
                                    var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                                    console.log(mDateStr, ': Rolled back - cleaning the trans ...');
                                });
                                reject({'msg': 'Nothing to update!'});
                            }
                        })
                        .catch(function(err) {
                            var mDate = new Date();
                            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                            console.log(mDateStr, ': Scenario ', scenario, ' catched error: ', err);
                            tx.rollback(function(err) {
                                var mDate = new Date();
                                var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                                console.log(mDateStr, ': Rolled back!');
                            });
                            reject(err);
                        // cb(err);
                        });
                    break;
                default:
                    var mDate = new Date();
                    var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                    console.log(mDateStr, ': Unknown workflow!');
                    // cb(null,{"msg": "Unknown workflow!"});
                    tx.rollback(function(err) {
                        console.log('Rolled back - cleaning the trans ...');
                    });
                    reject({'msg': 'Unknown workflow!'});
                } // end switch(workflow)
            });
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
            var mDate = new Date();
            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr, ': Registering new item ' + JSON.stringify(newMat) + ' ...');
            Material.create(newMat, function(err, inst) {
                if (err) {
                    reject(err);
                }
                var mDate = new Date();
                var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                console.log(mDateStr, 'Created row with id: ' + inst.id);
                resolve(inst);
            });
        });
    };

    Material.findInst = function(id) {
        return new Promise(function(resolve, reject) {
            var mDate = new Date();
            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            console.log(mDateStr, ': Seeking instance by id: ' + id);
            Material.findById(id, {}, function(err, inst) {
                var mDate = new Date();
                var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                if (err) {
                    console.log(mDateStr, ': Err. findById fired: ' + JSON.stringify(err));
                    reject(err);
                }
                console.log(mDateStr, ': Found instance to process ' + JSON.stringify(inst));
                return resolve(inst);
            });
        });
    };

    Material.updateInst = function(inst, updateData) {
        return new Promise(function(resolve, reject) {
            var mDate = new Date();
            var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
            if (updateData) {
                console.log(mDateStr, ': Updating instance by ' + JSON.stringify(updateData) + ' for id ' + inst.id);
                inst.updateAttributes(updateData, function(err, inst) {
                    var mDate = new Date();
                    var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                    if (err) {
                        console.log(mDateStr, ': Error when updating material instance: ' + JSON.stringify(err));
                        reject(err);
                    }
                    console.log(mDateStr, ': Updated record: ' + JSON.stringify(inst));
                    resolve(inst);
                });
            } else {
                console.log(mDateStr, ': Nothing to update!');
                reject({'msg': 'Nothing to update!'});
                // ??? resolve {"msg": "Nothing to update!"};
            }
        });
    };

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
                var mDate = new Date();
                var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
                console.log(mDateStr, ': Transfer data: ' + JSON.stringify(resp));
            }
            resolve(resp);
        });
    }; // doLogic
}; // function(Material)
