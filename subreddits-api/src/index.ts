import express, { Request, Response } from 'express';
import subredditRouter from './controllers/routes/subreddit.routes';
var cors = require("cors");

const app = express();
const port = 4000;

app.use(
  cors()
);

app.use('/api', subredditRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});