require("dotenv").config();
const express = require("express");
const router = require("../network/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

// bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
router(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// port
const port = process.env.PORT || 3000;

// app.use("/app", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server connected, listening on port ${port}`);
});