const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require("path"); // ✅ 이거 꼭 필요!


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Navigate API Docs',
      version: '1.0.0',
      description: 'API documentation for navigation endpoint',
    },
  },
  apis: [path.join(__dirname, 'index.js')], // ✅ index.js 경로를 정확히 지정
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
