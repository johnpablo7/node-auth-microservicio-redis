require("dotenv").config();
const express = require("express");
const router = require("../network/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const errors = require("../network/errors");

const app = express();

// bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// router
router(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errors);

// port
const port = process.env.PORT || 3000;

// app.use("/app", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server connected, listening on port ${port}`);
});
