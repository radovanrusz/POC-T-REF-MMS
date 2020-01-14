'use strict';

const loopback = require('loopback');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdirp = promisify(require('mkdirp'));
const DATASOURCE_NAME = 'db';
const dataSourceConfig = require('./server/datasources.json');
const db = new loopback.DataSource(dataSourceConfig[DATASOURCE_NAME]);
discover().then(
  success => process.exit(),
  error => {
    console.error('UNHANDLED ERROR:\n', error);
    process.exit(1);
  },
);
async function discover() {
  const options = {
    schema: 'DB2INST1',
    relations: true,
    views: true
  };
  const pohybySchemas = await db.discoverSchemas('MATERIAL', options);
  const stavySchemas = await db.discoverSchemas('MVM', options);
  await mkdirp('common/models');
  await writeFile(
    'common/models/material.json',
    JSON.stringify(pohybySchemas['DB2INST1.MATERIAL'], null, 2)
  );
  await writeFile(
    'common/models/mvm.json',
    JSON.stringify(stavySchemas['DB2INST1.MVM'], null, 2)
  );
  const configJson = await readFile('server/model-config.json', 'utf-8');
  console.log('MODEL CONFIG', configJson);
  const config = JSON.parse(configJson);
  config.Material = {
    dataSource: DATASOURCE_NAME,
    public: true
  };
  config.Mvm = {
    dataSource: DATASOURCE_NAME,
    public: true
  };
  await writeFile(
    'server/model-config.json',
    JSON.stringify(config, null, 2)
  );
}