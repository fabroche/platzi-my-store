const {
  logErrorsMiddleware,
  ormErrorHandlerMiddleware,
  boomErrorHandlerMiddleware,
  errorHandlerMiddleware
} = require("./error.handler");


function setCustomMiddlewares(app) {
  app.use(logErrorsMiddleware);
  app.use(boomErrorHandlerMiddleware);
  app.use(ormErrorHandlerMiddleware);
  app.use(errorHandlerMiddleware);
}

module.exports = {
  setCustomMiddlewares
}
