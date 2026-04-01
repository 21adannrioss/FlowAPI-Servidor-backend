// Muestra en consola la fecha, método y ruta de cada request
module.exports = function logger(method, path) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${method} ${path}`);
};