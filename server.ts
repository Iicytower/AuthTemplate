import * as dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { passportConfig } from "./passport/configPassport";

import { router as indexRouter } from './routes/index';

const app: express.Application = express();


passportConfig()

app.set('x-powered-by', false);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

const PORT: number = Number(process.env.PORT ?? 3002);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});
