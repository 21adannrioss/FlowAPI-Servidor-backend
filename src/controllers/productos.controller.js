const db = require("../services/db.service");
const {sendJSON, sendError} = require("../utils/response");
const parseBody = require("../utils/bodyParser");

exports.getAll = (req, res, query) => {
  let productos = db.getProductos();

  const {categoria, nombre} = query;
  if(categoria) productos = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  if(nombre) productos = productos.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));

  sendJSON(res, 200, { total: productos.length, productos });
};

exports.getById = (req, res, id) => {
  const producto = db.getProductoById(id);
  if(!producto) return sendError(res, 404, "Producto no encontrado");

  sendJSON(res, 200, producto);
};

exports.create = async (req, res) => {
  const body = await parseBody(req);
  if (!body.nombre || body.precio === undefined) return sendError(res, 400, "Datos inválidos");

  const nuevo = db.createProducto(body);
  sendJSON(res, 201, nuevo);
};

exports.update = async (req, res, id) => {
  const body = await parseBody(req);
  const updated = db.updateProducto(id, body);
  if (!updated) return sendError(res, 404, "Producto no encontrado");

  sendJSON(res, 200, updated);
};

exports.remove = (req, res, id) => {
  const deleted = db.deleteProducto(id);
  if (!deleted) return sendError(res, 404, "Producto no encontrado");

  sendJSON(res, 200, deleted);
};