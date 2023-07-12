const bcrypt = require("bcrypt");
const authJWT = require("../../../auth");
const TABLA = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });

    return bcrypt.compare(password, data.password).then((equal) => {
      // if (data.password === password)
      if (equal === true) {
        // Generar token;
        // return "TOKEN";
        return authJWT.sign(data);
      } else {
        throw new Error("Información invalida");
      }
    });
  }

  async function upsertAuth(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      // authData.password = data.password;
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsertAuth,
    login,
  };
};
