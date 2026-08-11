import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    let message = error.message || 'Internal Server Error';

    /* Mongoose validation error */
    if (err.name === 'ValidationError') {
      message = Object.values(err.errors)
        .map((e) => e.message)
        .join(', ');
      error = new ApiError(400, message);
    }

    /* Duplicate key */
    else if (err.code === 11000) {
      message = 'Duplicate field value entered';
      error = new ApiError(400, message);
    }

    /* Bad ObjectId */
    else if (err.name === 'CastError') {
      message = 'Resource not found';
      error = new ApiError(404, message);
    }

    /* JWT errors */
    else if (err.name === 'JsonWebTokenError') {
      error = new ApiError(401, 'Invalid token');
    } else if (err.name === 'TokenExpiredError') {
      error = new ApiError(401, 'Token expired');
    } else {
      error = new ApiError(statusCode, message);
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${error.statusCode}] ${error.message}`);
  }

  return res
    .status(error.statusCode)
    .json(new ApiResponse(error.statusCode, null, error.message));
};

export default errorHandler;
