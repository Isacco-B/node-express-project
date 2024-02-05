//import dependencies
import express from "express";
import mongoose from "mongoose";
import dotenvFlow from "dotenv-flow";
import swaggerUi from "swagger-ui-express";

// import routes
import userRoutes from "./routes/users.route.js";
import productRoutes from "./routes/products.route.js";
import orderRouters from "./routes/orders.route.js";

//load configuration from .env file
dotenvFlow.config();

const app = express();

//setup Swagger
import swaggerDocument from "./swagger/swagger.json" assert { type: "json" };
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connect to the MongoDB using Mongoose
mongoose.connect(process.env.DB_HOST);
const db = mongoose.connection;
db.on("error", (error) => console.error("Error connecting to database", error));
db.once("open", () =>
  console.log(`Connected to ${process.env.NODE_ENV} database`)
);

// parse requests of content-type - application/json
app.use(express.json());

//routes definition
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRouters);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});


//start up server
app.listen(3000, () =>
  console.log(
    "Listening on http://localhost:3000/" +
      "\nApiDoc: http://localhost:3000/api-docs/"
  )
);

export default app;
