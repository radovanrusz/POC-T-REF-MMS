module.exports = function(Material) {
  Material.findBy = function (kmat,mvm,limit,cb) {
    console.log('mms invoked with kmat:'+kmat+', mvm:'+mvm+', limit:'+limit+'  and callBack: ' + cb);
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
};

