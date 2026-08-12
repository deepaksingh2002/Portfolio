import 'dotenv/config';
import { connectDB } from './config/db.js';
import { app } from './app.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} — ${process.env.NODE_ENV || 'development'} mode`
      );
    });

    process.on('unhandled Rejection', (err) => {
      console.error('Unhandled Rejection:', err.message);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  });
