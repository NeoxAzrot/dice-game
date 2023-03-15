import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { router as roomRouter } from './routes/rooms.route.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Home page !');
});

app.use('/room', roomRouter);

app.listen(PORT, () => {
  console.log(
    `\n🚀 Connecting on port\u001b[1;34m http://localhost:${PORT} \u001b[0m\n`
  );
});
