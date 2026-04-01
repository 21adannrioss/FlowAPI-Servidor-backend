exports.sendJSON = (res, status, data) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(data, null, 2));
};

exports.sendError = (res, status, message) => {
  exports.sendJSON(res, status, {
    error: true,
    message,
  });
};