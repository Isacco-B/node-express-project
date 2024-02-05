import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "REST API POF",
    version: "1.0.0",
    description: "Planty of Food (POF) API Documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  tags: [
    {
      name: "User",
      description: "Operations about user",
    },
    {
      name: "Product",
      description: "Access to POF products",
    },
    {
      name: "Order",
      description: "Access to POF orders",
    },
  ],
};
const outputFile = "./swagger.json";
const routes = ["../server.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
