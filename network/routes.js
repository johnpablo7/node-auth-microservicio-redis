const user = require("../api/components/user/network");

const routes = function (app) {
  app.use("/api/user", user);
};

module.exports = routes;
