const user = require("../api/components/user/network");
const auth = require("../api/components/auth/network");

const routes = function (app) {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
};

module.exports = routes;
