import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';

dotenv.config();

const app = express();

app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
);


app.use(cors());
app.use(express.json());


app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});


app.get('/test-error', () => {
  throw new Error('Simulated server error');
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, _next) => {

  req.log?.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});