// Convierte el body de la petición HTTP en un objeto JSON
module.exports = function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    // Escucha datos que llegan en fragmentos
    req.on("data", chunk => (body += chunk));

    // Cuando termina de recibir todos los datos
    req.on("end", () => {
      try{
        // Intentar parsear JSON; si body está vacío, devuelve objeto vacío
        resolve(body? JSON.parse(body): {});
      }catch {
        reject(new Error("JSON inválido"));
      }
    });
    // Captura errores de transmisión de datos
    req.on("error", reject);
  });
};