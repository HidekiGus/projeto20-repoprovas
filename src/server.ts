import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import router from './routes';
import errorHandler from './middlewares/errorHandler';

const server = express();
server.use(express.json());
server.use(cors());
server.use(router);
server.use(errorHandler);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
