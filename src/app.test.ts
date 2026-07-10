import { describe, expect, test } from 'bun:test';
import { buildApp } from './app';

describe('app', () => {
  test('GET /health returns ok', async () => {
    const response = await buildApp().handle(new Request('http://localhost/health'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'ok' });
  });

  test('GET /db-status is safe without MySQL env', async () => {
    const response = await buildApp().handle(new Request('http://localhost/db-status'));

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(['unconfigured', 'unavailable', 'error', 'connected']).toContain(body.status);
  });
});

