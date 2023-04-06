const createError = require("http-errors");

//not found handler
function notFoundHanlder(req, res, next) {
  next(createError(404, "Requested Page not Foudnd"));
}

//default error handler
function errorHandler(err, req, res, next) {
  res.render("error", {
    title: "Error Page",
  });
}

module.exports = {
  notFoundHanlder,
  errorHandler,
};
