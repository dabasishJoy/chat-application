const createError = require("http-errors");

//not found handler
function notFoundHanlder(req, res, next) {
  next(createError(404, "Requested Page not Found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    // html response
    res.render("error", {
      title: "Error page",
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHanlder,
  errorHandler,
};
