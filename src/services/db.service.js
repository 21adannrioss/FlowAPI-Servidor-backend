const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../data/db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function generateId(items) {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

exports.getProductos = () => readDB().productos;
exports.getProductoById = (id) => readDB().productos.find(p => p.id === id);
exports.createProducto = (data) => {
  const db = readDB();
  const nuevo = {
    id: generateId(db.productos),
    ...data,
    creado_en: new Date().toISOString(),
  };

  db.productos.push(nuevo);
  writeDB(db);

  return nuevo;
};

exports.updateProducto = (id, data) => {
  const db = readDB();
  const index = db.productos.findIndex(p => p.id === id);
  if(index === -1) return null;

  db.productos[index] = {
    ...db.productos[index],
    ...data,
    actualizado_en: new Date().toISOString(),
  };

  writeDB(db);
  return db.productos[index];
};

exports.deleteProducto = (id) => {
  const db = readDB();
  const index = db.productos.findIndex(p => p.id === id);
  if(index === -1) return null;

  const removed = db.productos.splice(index, 1)[0];
  writeDB(db);
  return removed;
};