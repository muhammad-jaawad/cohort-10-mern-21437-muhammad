import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import { notFoundHandler, errorHandler } from '../src/middleware/errorHandler';
import logger from '../src/config/logger';

describe('Malformed JSON body', () => {
  it('returns 400 with a meaningful message and no stack', () => {
    return request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send('{"broken":')
      .then((res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.be.a('string').and.not.be.empty;
        expect(res.body).to.not.have.property('stack');
      });
  });
});

describe('Unexpected thrown error', () => {
  const testApp = express();
  testApp.get('/boom', () => {
    throw new Error('boom');
  });
  testApp.use(notFoundHandler);
  testApp.use(errorHandler);

  it('returns 500 with the generic message and no stack', () => {
    return request(testApp)
      .get('/boom')
      .then((res) => {
        expect(res.status).to.equal(500);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Internal server error');
        expect(res.body).to.not.have.property('stack');
      });
  });
});

describe('Parser error logging', () => {
  const SECRET = 'super-secret-value';
  const calls: unknown[][] = [];
  const originalWarn = logger.warn;
  const originalError = logger.error;

  beforeEach(() => {
    calls.length = 0;
    const capture = (...args: unknown[]) => {
      calls.push(args);
    };
    (logger as unknown as { warn: unknown }).warn = capture;
    (logger as unknown as { error: unknown }).error = capture;
  });

  afterEach(() => {
    logger.warn = originalWarn;
    logger.error = originalError;
  });

  it('never logs or returns the raw request body', async () => {
    const res = await request(app)
      .post('/api/health')
      .set('Content-Type', 'application/json')
      .send(`{"password":"${SECRET}",`);

    expect(res.status).to.equal(400);
    expect(JSON.stringify(res.body)).to.not.include(SECRET);
    expect(calls).to.not.be.empty;
    expect(JSON.stringify(calls)).to.not.include(SECRET);
  });
});
