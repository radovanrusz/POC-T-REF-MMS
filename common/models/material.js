module.exports = function(Material) {

  Material.listAll = function(cb) {
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

