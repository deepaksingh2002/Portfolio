import mongoose from 'mongoose';

const getConfiguredMongoUris = () => {
  const primary = process.env.MONGODB_URI?.trim();
  const direct = process.env.MONGODB_DIRECT_URI?.trim();

  return [primary, direct].filter((value): value is string => Boolean(value));
};

const isSrvDnsError = (error: unknown) => {
  if (!error || typeof error !== 'object') return false;

  const code = 'code' in error ? String(error.code) : '';
  const syscall = 'syscall' in error ? String(error.syscall) : '';

  return syscall === 'querySrv' && (code === 'ECONNREFUSED' || code === 'ENOTFOUND');
};

const logMongoError = (error: unknown, attemptedUri: string) => {
  const usingSrv = attemptedUri.startsWith('mongodb+srv://');

  if (usingSrv && isSrvDnsError(error)) {
    console.error(
      [
        'MongoDB connection error: Atlas SRV DNS lookup failed.',
        'The current MONGODB_URI uses mongodb+srv://, but this machine could not resolve the cluster DNS record.',
        'Fix options:',
        '1. Verify the Atlas hostname in MONGODB_URI is correct.',
        '2. Add MONGODB_DIRECT_URI with the non-SRV connection string from Atlas.',
        '3. Or switch to a local MongoDB URI like mongodb://127.0.0.1:27017/portfolio.',
      ].join('\n')
    );
    return;
  }

  console.error('MongoDB connection error:', error);
};

export const connectDB = async () => {
  const mongoUris = getConfiguredMongoUris();

  if (mongoUris.length === 0) {
    console.error(
      'MongoDB connection error: set MONGODB_URI or MONGODB_DIRECT_URI in server/.env before starting the server.'
    );
    process.exit(1);
  }
  let lastError: unknown;

  for (const uri of mongoUris) {
    try {
      const connectInstance = await mongoose.connect(uri);
      console.log(`MongoDB connected !! DB_Host:: ${connectInstance.connection.host}`);
      return connectInstance;
    } catch (error) {
      lastError = error;
      logMongoError(error, uri);
    }
  }

  process.exitCode = 1;
  throw lastError;
};
