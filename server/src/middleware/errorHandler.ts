import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message,
      errors: err.errors || undefined,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || undefined,
  });
};
