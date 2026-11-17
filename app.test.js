const request = require('supertest');
const app = require('./app');

describe('Pruebas CI - Sistema Restaurante SaborCloud', () => {
  test('GET /api/health debe responder 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  test('POST /api/reservas debe crear una reserva nueva (201)', async () => {
    const res = await request(app)
      .post('/api/reservas')
      .send({ mesa: 2, hora: '21:00', cliente: 'Ana' });
    expect(res.statusCode).toBe(201);
  });

  test('POST /api/reservas debe rechazar mesa duplicada (409)', async () => {
    const res = await request(app)
      .post('/api/reservas')
      .send({ mesa: 1, hora: '20:00', cliente: 'Pedro' });
    expect(res.statusCode).toBe(409);
  });
});