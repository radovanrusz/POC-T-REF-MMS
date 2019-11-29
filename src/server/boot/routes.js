
module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/mms', async (req, res) => {
    const params = req && req.query;
    const {mvm = '', kmat = '', limit = ''} = params;
    console.log('findMat', params);
    console.log('mvm:', mvm, ' kmat:', kmat, ' limit:', limit);
    try {
      /*
         *   const findMat = {
         *    kmat: { $eq: kmat },
         *    mvm: { $eq: mvm }
         * };
         */
        const findMat = {};
        if (kmat) {
            findMat.kmat = {$eq: kmat};
        }
        if (mvm) {
            findMat.mvm = {$eq: mvm};
        }
        let material = '';
        if (limit) {
          material = await Material.find(findMat).limit(Number(limit));
        } else {
          material = await Material.find(findMat);
        }
        res.json(material); 

      //res.status(201).send("Materials list");
    } catch(e) {
      console.error('unable to execute find', e);
      res.status(500).json({error: e});
    }
  });
  app.use(router);
};