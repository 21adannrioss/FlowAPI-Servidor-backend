// Simula una base de datos JSON
const db = require("../services/db.service");

const {sendJSON, sendError} = require("../utils/response");
const parseBody = require("../utils/bodyParser");

// Devuelve todos los productos con filtros opcionales
exports.getAll = (req, res, query) => {
  let productos = db.getProductos();

  const {categoria, nombre} = query;

  // Filtra por categoría ignorando mayúsculas/minúsculas
  if(categoria) productos = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());

  // Filtra por coincidencia parcial del nombre
  if(nombre) productos = productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));

  // Respuesta con total y lista resultante
  sendJSON(res, 200, { total: productos.length, productos });
};

// Obtiene un producto concreto por ID
exports.getById = (req, res, id) => {
  const producto = db.getProductoById(id);
  if(!producto) return sendError(res, 404, "Producto no encontrado");
  sendJSON(res, 200, producto);
};

// Crea un nuevo producto
exports.create = async (req, res) => {
  const body = await parseBody(req);
  if (!body.nombre || body.precio === undefined)
    return sendError(res, 400, "Datos inválidos");

  // Se delega la creación al servicio de datos
  const nuevo = db.createProducto(body);

  // Devuelve recurso creado
  sendJSON(res, 201, nuevo);
};

// Actualiza un producto existente
exports.update = async (req, res, id) => {
  const body = await parseBody(req);
  const updated = db.updateProducto(id, body);

  // Si el producto no existe → 404
  if (!updated) return sendError(res, 404, "Producto no encontrado");

  sendJSON(res, 200, updated);
};

// Elimina un producto
exports.remove = (req, res, id) => {
  const deleted = db.deleteProducto(id);

  // Control de inexistencia
  if(!deleted) return sendError(res, 404, "Producto no encontrado");

  sendJSON(res, 200, deleted);
};