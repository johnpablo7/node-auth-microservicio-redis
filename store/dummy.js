const db = {
  user: [{ id: "1", name: "Miguel" }],
};

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let dbTable = await list(table);
  return dbTable.filter((item) => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = [];
  }

  db[table].push(data);

  console.log(db);
  // return data;
}

async function remove(table, id) {
  const index = db[table].findIndex((item) => item.id == id);
  db[table].splice(index, 1);

  return true;
}

async function query(table, q) {
  let dbTable = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];

  return dbTable.filter((item) => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
