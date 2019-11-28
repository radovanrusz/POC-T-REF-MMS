module.exports = function(Material) {
  Material.listAll = function(cb) {
    console.log('listAll invoked with callBack: ' + cb);
    Material.find({}, cb);
  };

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

