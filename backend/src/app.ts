import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';

import env from './config/env';
import logger from './config/logger';
import routes from './routes';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
