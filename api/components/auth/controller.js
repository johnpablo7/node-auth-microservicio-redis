const authJWT = require("../../../auth");
const TABLA = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    if (data.password === password) {
      // Generar token;
      // return "TOKEN";
      return authJWT.sign(data);
    } else {
      throw new Error("Información invalida");
    }
  }

  function upsertAuth(data) {
    const authData = {
      id: data.id,
    };

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = data.password;
    }

    return store.upsert(TABLA, authData);
  }

  return {
    upsertAuth,
    login,
  };
};
