import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Latin Ecom backend listening on port ${PORT}`);
  });
}

export default app;
