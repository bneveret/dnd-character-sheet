const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Myth Smith',
    description: 'D&D Character Creator'
  },
  host: 'mythsmith.onrender.com',
  schemes: ['https']
  //host: 'localhost:8080',
  //schemes: ['http']
};

const outputFile = '../swagger.json';
const endpointsFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);