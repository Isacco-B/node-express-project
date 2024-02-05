import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
const expect = chai.expect;
chai.use(chaiHttp);

before(async () => {
  try {
    await Order.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

after(async () => {
  try {
    await Order.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

describe("Order API", () => {
  afterEach(async () => {
    try {
      await User.deleteMany({});
      await Product.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  });
  /* This is a test case that verifies that there are 0 products in the database. */
  it("should verify that we have 0 order in the DB", async () => {
    try {
      const res = await chai.request(server).get("/api/order/");

      expect(res).to.have.status(404);
      expect(res.error.text).to.equal(
        '{"success":false,"statusCode":404,"message":"Order not found"}'
      );
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies the functionality of creating a new product. */
  it("should create a new order", async () => {
    const newUser = await chai.request(server).post("/api/user/").send({
      firstName: "user",
      lastName: "test",
      email: "usertest@gmail.com",
    });
    const userId = newUser.body._id;
    const newProduct = await chai.request(server).post("/api/product/").send({
      name: "Testproduct",
    });
    const productId = newProduct.body._id;
    const newOrder = {
      products: [productId],
      users: [userId],
    };
    try {
      const res = await chai.request(server).post("/api/order/").send(newOrder);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.products[0]).to.equal(newOrder.products[0]);
      expect(res.body.users[0]).to.equal(newOrder.users[0]);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies that there is one product in the database.  */
  it("should verify that we have 1 order in the DB", async () => {
    try {
      const res = await chai.request(server).get("/api/order/");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(1);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies the functionality of deleting a product. */
  it("should delete a order", async () => {
    const orders = await Order.find();
    const orderId = orders[0]._id;
    try {
      const res = await chai.request(server).delete(`/api/order/${orderId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.equal("Order has been deleted");
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });
});
