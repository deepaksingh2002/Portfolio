import { Request, Response, NextFunction } from 'express';

const parseArrayField = (value: unknown) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fall back to comma-separated parsing below.
  }

  return trimmed.split(',').map((item) => item.trim());
};

const parseBooleanField = (value: unknown) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'true') return true;
  if (normalized === 'false') return false;

  return value;
};

const parseNumberField = (value: unknown) => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return value;
  }

  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? value : parsed;
};

export const normalizeProjectPayload = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const techStack = parseArrayField(req.body.techStack);

  req.body = {
    ...req.body,
    techStack: Array.isArray(techStack)
      ? [...new Set(techStack.map((item) => String(item).trim()).filter(Boolean))]
      : techStack,
    featured: parseBooleanField(req.body.featured),
    order: parseNumberField(req.body.order),
  };

  next();
};
