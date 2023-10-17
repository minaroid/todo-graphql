require('dotenv').config();
const fs = require('fs');

const { fileLoader } = require('merge-graphql-schemas');
const path = require('path');

const localSchemaFile = './schema.graphql';

const allTypes = fileLoader(path.join(__dirname, './src/schema/**/*.graphql'));

const graphql = `
  ${allTypes.join(' ')}
`;

if (fs.existsSync(localSchemaFile)) {
  //file exists
  fs.unlinkSync(localSchemaFile);
}
fs.writeFileSync(localSchemaFile, graphql);
// apollo.config.js
module.exports = {
  service: {
    // Must match the name of your graph in Graph Manager
    name: 'gymapp-schema',

    // EITHER THIS
    // endpoint: {
    //   url: `http://localhost:${process.env.NODE_PORT}/graphql`,
    // },
    // OR THIS
    localSchemaFile,
  },
};
