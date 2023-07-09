const jwt = require("jsonwebtoken");

function sign(token) {
  return jwt.sign(token, "secreto");
}

module.exports = { sign };
