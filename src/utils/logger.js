module.exports = function logger(method, path) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${method} ${path}`);
};