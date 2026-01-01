const request = require('supertest');
const { app } = require('../server');

describe('API Endpoints', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status');
      expect(response.body.status).toBe('ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /api/explain', () => {
    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .post('/api/explain')
        .send({
          code: 'console.log("test")',
          language: 'javascript'
        });
      
      expect(response.status).toBe(401);
    });

    it('should return 400 with invalid language', async () => {
      const response = await request(app)
        .post('/api/explain')
        .set('Authorization', 'Bearer invalid-token')
        .send({
          code: 'test code',
          language: 'invalid'
        });
      
      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/history', () => {
    it('should return 401 without authentication', async () => {
      const response = await request(app).get('/api/history');
      
      expect(response.status).toBe(401);
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
