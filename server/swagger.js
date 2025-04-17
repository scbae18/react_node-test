const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Navigate API Docs',
      version: '1.0.0',
      description: 'API documentation for navigation endpoint',
    },
  },
  apis: ['./index.js'], // 주석 작성할 파일 경로
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
