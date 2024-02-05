import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import Product from "../models/product.model.js";
const expect = chai.expect;
chai.use(chaiHttp);

before(async () => {
  try {
    await Product.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

after(async () => {
  try {
    await Product.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

describe("Product API", () => {
  /* This is a test case that verifies that there are 0 products in the database. */
  it("should verify that we have 0 products in the DB", async () => {
    try {
      const res = await chai.request(server).get("/api/product/");

      expect(res).to.have.status(404);
      expect(res.error.text).to.equal(
        '{"success":false,"statusCode":404,"message":"Product not found"}'
      );
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies the functionality of creating a new product. */
  it("should create a new product", async () => {
    const newProduct = {
      name: "Product 1",
    };
    try {
      const res = await chai
        .request(server)
        .post("/api/product/")
        .send(newProduct);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.name).to.equal(newProduct.name);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies that there is one product in the database.  */
  it("should verify that we have 1 product in the DB", async () => {
    try {
      const res = await chai.request(server).get("/api/product");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(1);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* The code is a test case that verifies the functionality of updating a product. */
  it("should update a product", async () => {
    const product = await Product.findOne({ name: "Product 1" });
    const productId = product._id;
    const updatedProduct = {
      name: "Product 1 Updated",
    };
    try {
      const res = await chai
        .request(server)
        .patch(`/api/product/${productId}`)
        .send(updatedProduct);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.updatedProduct.name).to.equal(updatedProduct.name);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies the functionality of deleting a product. */
  it("should delete a product", async () => {
    const product = await Product.findOne({ name: "Product 1 Updated" });
    const productId = product._id;
    try {
      const res = await chai
        .request(server)
        .delete(`/api/product/${productId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal("Product has been deleted");
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });
});
