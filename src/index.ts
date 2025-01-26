import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/interact', (req, res) => {
  // Handle player interactions
  res.send('Player interaction handled');
});

app.get('/npc/:id', (req, res) => {
  // Fetch NPC data
  res.send(`NPC data for ID: ${req.params.id}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
