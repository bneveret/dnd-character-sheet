const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Myth Smith',
    description: 'D&D Character Creator'
  },
  host: 'https://mythsmith.onrender.com',
  schemes: ['https']
};

const outputFile = '../swagger.json';
const endpointsFiles = ['../routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);