import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import env from '../src/config/env';

describe('CORS origin', () => {
  it('defaults to the Vite dev server origin (http://localhost:5173)', () => {
    expect(env.corsOrigin).to.equal('http://localhost:5173');
  });

  it('allows only the configured origin, never a wildcard', async () => {
    const res = await request(app).get('/api/health').set('Origin', env.corsOrigin);
    expect(res.headers['access-control-allow-origin']).to.equal(env.corsOrigin);
  });

  it('does not allow a different origin', async () => {
    const res = await request(app).get('/api/health').set('Origin', 'http://evil.example');
    expect(res.headers['access-control-allow-origin']).to.not.equal('http://evil.example');
    expect(res.headers['access-control-allow-origin']).to.not.equal('*');
  });
});
