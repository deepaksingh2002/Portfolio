import {configDotenv} from 'dotenv';
import app from './app.js';

import { connectDB } from './config/db.js';

configDotenv({
    path: './.env',
});

connectDB()
.then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Failed to connect to the database:', error);
});
