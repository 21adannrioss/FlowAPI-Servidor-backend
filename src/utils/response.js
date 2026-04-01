// Envía una respuesta JSON con status HTTP
exports.sendJSON = (res, status, data) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(data, null, 2)); // JSON bonito con indentación
};

// Envía un error estandarizado como JSON
exports.sendError = (res, status, message) => {
  exports.sendJSON(res, status, {
    error: true,
    message, // Mensaje de error personalizado
  });
};