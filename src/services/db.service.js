const fs = require("fs");
const path = require("path");

// Ruta absoluta al archivo JSON que actúa como base de datos
const DB_PATH = path.join(__dirname, "../../data/db.json");

// Lee y parsea todo el contenido de db.json
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

// Sobrescribe db.json con el contenido actualizado
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Genera un ID único incremental para los nuevos elementos
function generateId(items) {
  return items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

// Devuelve todos los productos
exports.getProductos = () => readDB().productos;

// Devuelve un producto por ID, o undefined si no existe
exports.getProductoById = (id) => readDB().productos.find(p => p.id === id);

// Crea un nuevo producto y lo guarda en la "base de datos"
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

// Actualiza un producto existente por ID
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

// Elimina un producto por ID
exports.deleteProducto = (id) => {
  const db = readDB();
  const index = db.productos.findIndex(p => p.id === id);
  if(index === -1) return null;
  const removed = db.productos.splice(index, 1)[0];
  writeDB(db);
  return removed;
};