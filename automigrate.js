'use strict';
// Copy this script to server/boot directory and it will be executed when app is started.
// Update (or create) database schema (https://loopback.io/doc/en/lb3/Creating-a-database-schema-from-models.html)
module.exports = function(app, cb) {
  updateDatabaseSchema(app).then(() => {
    process.nextTick(cb);
  });
};

async function updateDatabaseSchema(app) {
  const dataSource = app.dataSources.db;

  for (let model of app.models()) {
    console.log(`Checking autoupdate for model ${model.modelName}`);
    if (await doesModelNeedUpdate(dataSource, model.modelName) === true) {
        await updateSchemaForModel(dataSource, model.modelName);
    }
  }
}

function doesModelNeedUpdate(dataSource, model) {
  return new Promise((resolve, reject) => {
    dataSource.isActual(model, (err, actual) => {
      if (err) {
      console.log('Error for model ' + err );     
      reject(err);
      } else {
      resolve(!actual);
      }
    });
  });
}

function updateSchemaForModel(dataSource, model) {
  return new Promise((resolve, reject) => {
    dataSource.autoupdate(model, (err, result) => {
      if (err) reject(err);
      console.log(`Autoupdate performed for model ${model}`);
      resolve();
    });
  });
}