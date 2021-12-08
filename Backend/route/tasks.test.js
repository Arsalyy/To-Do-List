const request = require('supertest');

describe('/api/tasks', () => {
    it('should return all tasks', async () => {
        const res = await request('http://localhost:3000/api/tasks').get('/');
        expect(res.status).toBe(200);
    });
});