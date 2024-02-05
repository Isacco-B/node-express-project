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
  components: {
    schemas: {
      userShema: {
        firstName: "Alexander",
        lastName: "Jones",
        email: "Alexander@gmail.com",
      },
      updateUserShema: {
        firstName: "Lucas",
        lastName: "Jones",
        email: "Lucas@gmail.com",
      },
      productShema: {
        name: "apple",
      },
      orderSchema: {
        products: ["product1Id", "product2Id", "product3Id"],
        users: ["user1Id", "user2Id", "user3Id"],
      },
    },
  },
};
const outputFile = "./swagger.json";
const routes = ["../server.js"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
