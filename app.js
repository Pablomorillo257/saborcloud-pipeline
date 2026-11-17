const express = require('express');
const app = express();
app.use(express.json());

let reservas = [{ mesa: 1, hora: '20:00', cliente: 'Carlos' }];

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'SaborCloud API' });
});

app.post('/api/reservas', (req, res) => {
  const { mesa, hora, cliente } = req.body;
  const ocupada = reservas.find(r => r.mesa === mesa && r.hora === hora);
  if (ocupada) {
   return res.status(409).json({ error: 'Mesa ya reservada en ese horario' });
  const nueva = { mesa, hora, cliente };
  reservas.push(nueva);
  res.status(201).json(nueva);
});

module.exports = app;