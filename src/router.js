const url = require("url");
const {sendError} = require("./utils/response");
const productosController = require("./controllers/productos.controller");
const logger = require("./utils/logger");

// Router principal, decide qué acción ejecutar según método y ruta
async function router(req, res) {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname.replace(/\/$/, "") || "/";
  const method = req.method.toUpperCase();
  logger(method, pathname);

  // Configuración CORS básica
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if(method === "OPTIONS") {
    res.writeHead(204); // Sin contenido
    return res.end();
  }

  try{
    // Endpoints /productos
    if(pathname === "/productos" && method === "GET")
      return productosController.getAll(req, res, parsed.query);

    if(pathname === "/productos" && method === "POST")
      return productosController.create(req, res);

    // Endpoints /productos/:id
    const match = pathname.match(/^\/productos\/(\d+)$/);
    if(match) {
      const id = parseInt(match[1]);

      if (method === "GET") return productosController.getById(req, res, id);
      if (method === "PUT") return productosController.update(req, res, id);
      if (method === "DELETE") return productosController.remove(req, res, id);
    }

    // Si la ruta no coincide = 404
    sendError(res, 404, "Ruta no encontrada");
  }catch(err) {
    // Captura errores inesperados = 500
    sendError(res, 500, err.message);
  }
}

module.exports = router;