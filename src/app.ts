import express from 'express';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from './middlewares'

const app = express();
app.set('trust proxy', true);
app.use(json());

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }