'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const DATASOURCE_NAME = 'db';
const dataSourceConfig = require('../datasources.dev.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);
discover().then(
  success => process.exit(),
  error => {
    console.error('UNHANDLED ERROR:\n', error);
    process.exit(1);
  });

async function discover() {
  const options = {
    schema: 'DB2INST1',
    relations: true,
    views: true
  };
  const extractMaterial = await db.discoverSchemas('MATERIAL', options);
  const extractMvm = await db.discoverSchemas('MVM', options);
  await mkdirp('common/models');
  await writeFile(
    'src/common/models/extractMaterial.json',
    JSON.stringify(extractMaterial['DB2INST1.MATERIAL'], null, 2)
  );
  await writeFile(
    'src/common/models/extractMvm.json',
    JSON.stringify(extractMvm['DB2INST1.MVM'], null, 2)
  );

// Uncomment this section if you want to add new models into model-config
  /* 
  const configJson = await readFile('src/server/model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);
  config.extractMaterial = {
    dataSource: DATASOURCE_NAME,
    public: true
  };
  config.extractMvM = {
    dataSource: DATASOURCE_NAME,
    public: true
  };
  await writeFile(
    'server/model-config.json',
    JSON.stringify(config, null, 2)
  );
*/
}