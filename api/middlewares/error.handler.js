const {ValidationError} = require('sequelize');

function logErrorsMiddleware(err, req, res, next) {
  console.log('logErrorsMiddleware')
  console.error(err);
  next(err);
}

function errorHandlerMiddleware(err, req, res, next) {
  console.log('errorHandlerMiddleware')
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
}

function boomErrorHandlerMiddleware(err, req, res, next) {
  console.log('boomErrorHandlerMiddleware');
  if (!err.isBoom) {
    next(err);
  }
  const {output} = err;
  res.status(output.statusCode).json(
    output.payload
  );
}

function ormErrorHandlerMiddleware(err, req, res, next) {
  console.log('ormErrorHandlerMiddleware')
  if (!err instanceof ValidationError) {
    next(err);
  }

  res.status(409).json({
    error: err.name,
    message: err.message,
    errors: err.errors,
  });
}

module.exports = {
  logErrorsMiddleware,
  errorHandlerMiddleware,
  boomErrorHandlerMiddleware,
  ormErrorHandlerMiddleware,
}
