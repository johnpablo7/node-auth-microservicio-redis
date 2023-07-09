const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy");
  }

  function listUser() {
    return store.list(TABLA);
  }

  function getUser(id) {
    return store.get(TABLA, id);
  }

  async function upsertUser(body) {
    const user = {
      name: body.name,
      username: body.username,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.username || body.password) {
      await auth.upsertAuth({
        id: user.id,
        username: user.username,
        password: body.password,
      });
    }

    return store.upsert(TABLA, user);
  }

  function deleteUser(id) {
    return store.remove(TABLA, id);
  }

  return {
    listUser,
    getUser,
    upsertUser,
    deleteUser,
  };
};
