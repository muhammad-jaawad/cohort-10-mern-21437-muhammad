import { expect } from 'chai';

function loadPort(raw: string | undefined): number {
  const original = process.env.PORT;
  if (raw === undefined) delete process.env.PORT;
  else process.env.PORT = raw;
  delete require.cache[require.resolve('../src/config/env')];
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const port = require('../src/config/env').default.port as number;
  if (original === undefined) delete process.env.PORT;
  else process.env.PORT = original;
  return port;
}

describe('env PORT parsing', () => {
  it('preserves an explicit PORT=0', () => {
    expect(loadPort('0')).to.equal(0);
  });
  it('uses a valid configured port', () => {
    expect(loadPort('8080')).to.equal(8080);
  });
  it('falls back to 5000 when unset, empty or invalid', () => {
    expect(loadPort(undefined)).to.equal(5000);
    expect(loadPort('')).to.equal(5000);
    expect(loadPort('abc')).to.equal(5000);
    expect(loadPort('70000')).to.equal(5000);
  });
});
