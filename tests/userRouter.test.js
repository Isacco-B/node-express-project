import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js"
import User from "../models/user.model.js";
const expect = chai.expect;
chai.use(chaiHttp);

before(async () => {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

after(async () => {
  try {
    await User.deleteMany({});
  } catch (error) {
    console.log(error);
  }
});

describe("User API", () => {

  /* This is a test case that verifies that there are 0 users in the database. */
  it("should verify that we have 0 users in the DB", async () => {
    try {
      const res = await chai.request(server).get("/api/user/")
      expect(res).to.have.status(404);
      expect(res.error.text).to.equal(
        '{"success":false,"statusCode":404,"message":"User not found"}'
      );
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies the functionality of creating a new user. */
  it("should create a new user", async () => {
    const newUser = {
      firstName: "user",
      lastName: "test",
      email: "usertest@gmail.com",
    };
    try {
      const res = await chai.request(server).post("/api/user/").send(newUser);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an("object");
      expect(res.body.firstName).to.equal(newUser.firstName);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies that there is one user in the database.  */
  it("should verify that we have 1 user in the DB", async () => {
    try {
      const res = await chai.request(server).get("/api/user/");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(1);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* The code is a test case that verifies the functionality of updating a user. */
  it("should update a user", async () => {
    const user = await User.findOne({ email: "usertest@gmail.com" });
    const userId = user._id;
    const updatedUser = {
      firstName: "updated",
    };
    try {
      const res = await chai
        .request(server)
        .patch(`/api/user/${userId}`)
        .send(updatedUser);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.updatedUser.firstName).to.equal(updatedUser.firstName);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });

  /* This code is a test case that verifies the functionality of deleting a user. */
  it("should delete a user", async () => {
    const user = await User.findOne({ email: "usertest@gmail.com" });
    const userId = user._id;
    try {
      const res = await chai.request(server).delete("/api/user/" + userId);
      expect(res).to.have.status(200);
    } catch (error) {
      expect.fail(`Test failed with error: ${error.message}`);
    }
  });
});
