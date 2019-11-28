module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/mms', async (req, res) => {
    try {
      res.status(201).send("Materials list");
    } catch(e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
  app.use(router);
};