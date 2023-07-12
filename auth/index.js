const jwt = require("jsonwebtoken");
const error = require("../utils/error");

const secret = process.env.JWT_SECRET;

function sign(token) {
  return jwt.sign(token, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log(decoded);

    // Comprobar si es o no propio
    if (decoded.id !== owner) {
      throw error("No tienes permiso", 401);
    }
  },
};

function getToken(auth) {
  // Bearer
  if (!auth) {
    throw new Error("No viene token");
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw new Error("Formato invalido");
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

module.exports = { sign, check };
