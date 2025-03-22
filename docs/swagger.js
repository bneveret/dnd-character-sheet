const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Myth Smith',
    description: 'D&D Character Creator'
  },
  host: 'localhost:8080',
  schemes: ['http']
  // host: 'localhost:8080',
  // schemes: ['http']
  //mythsmith.onrender.com
};

const outputFile = '../swagger.json';
const endpointsFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);