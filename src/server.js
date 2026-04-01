const http = require("http");
const router = require("./router");

// Puerto donde se expondrá la API
const PORT = 3000;

// Crear servidor HTTP y asignar router
const server = http.createServer(router);

// Arrancar el servidor
server.listen(PORT, () => {
  console.log("║      FlowAPI iniciado      ║");
  console.log(`║   http://localhost:${PORT}    ║`);
});