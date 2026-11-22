import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('GET /api/health', () => {
  it('returns a 200 with an ok status', () => {
    return request(app)
      .get('/api/health')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.status).to.equal('ok');
        expect(res.body.timestamp).to.be.a('string');
        expect(new Date(res.body.timestamp).toISOString()).to.equal(res.body.timestamp);
      });
  });
});

describe('GET /api/unknown-route', () => {
  it('returns a 404 with no success and no stack', () => {
    return request(app)
      .get('/api/unknown-route')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.success).to.equal(false);
        expect(res.body).to.not.have.property('stack');
      });
  });
});
