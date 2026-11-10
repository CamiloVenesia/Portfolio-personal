
import test from 'node:test';
import assert from 'node:assert/strict';
import { createIdempotencyStore } from '../api/contact-idempotency.js';

const successfulResult = {
  cache: true,
  statusCode: 200,
  body: { success: true }
};

test('reutiliza el resultado exitoso sin ejecutar el envío otra vez', async () => {
  const store = createIdempotencyStore();
  let executions = 0;

  const first = await store.execute(
    'contact-key-0001',
    'fingerprint-a',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  const second = await store.execute(
    'contact-key-0001',
    'fingerprint-a',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  assert.equal(first.type, 'executed');
  assert.equal(second.type, 'replayed');
  assert.equal(executions, 1);
  assert.deepEqual(second.result, successfulResult);
});

test('agrupa solicitudes simultáneas con la misma clave', async () => {
  const store = createIdempotencyStore();
  let executions = 0;
  let releaseOperation;

  const operation = () => {
    executions += 1;

    return new Promise((resolve) => {
      releaseOperation = () => resolve(successfulResult);
    });
  };

  const firstRequest = store.execute(
    'contact-key-0002',
    'fingerprint-b',
    operation
  );

  await new Promise((resolve) => setImmediate(resolve));

  const secondRequest = store.execute(
    'contact-key-0002',
    'fingerprint-b',
    operation
  );

  releaseOperation();

  const [first, second] = await Promise.all([
    firstRequest,
    secondRequest
  ]);

  assert.equal(executions, 1);
  assert.equal(first.type, 'executed');
  assert.equal(second.type, 'replayed');
  assert.deepEqual(first.result, successfulResult);
  assert.deepEqual(second.result, successfulResult);
});

test('rechaza reutilizar una clave con contenido diferente', async () => {
  const store = createIdempotencyStore();
  let executions = 0;

  await store.execute(
    'contact-key-0003',
    'fingerprint-original',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  const result = await store.execute(
    'contact-key-0003',
    'fingerprint-different',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  assert.equal(result.type, 'conflict');
  assert.equal(executions, 1);
});

test('no conserva errores y permite un reintento explícito', async () => {
  const store = createIdempotencyStore();
  let executions = 0;

  const failedResult = {
    cache: false,
    statusCode: 500,
    body: { error: 'No se pudo enviar.' }
  };

  const first = await store.execute(
    'contact-key-0004',
    'fingerprint-c',
    async () => {
      executions += 1;
      return failedResult;
    }
  );

  const second = await store.execute(
    'contact-key-0004',
    'fingerprint-c',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  assert.equal(first.type, 'executed');
  assert.equal(second.type, 'executed');
  assert.equal(executions, 2);
  assert.deepEqual(second.result, successfulResult);
});

test('expira las claves completadas después del TTL', async () => {
  let currentTime = 1000;
  const store = createIdempotencyStore({
    ttlMs: 1000,
    now: () => currentTime
  });
  let executions = 0;

  await store.execute(
    'contact-key-0005',
    'fingerprint-d',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  currentTime = 2001;

  const result = await store.execute(
    'contact-key-0005',
    'fingerprint-d',
    async () => {
      executions += 1;
      return successfulResult;
    }
  );

  assert.equal(result.type, 'executed');
  assert.equal(executions, 2);
});

test('limita la cantidad de claves en memoria', async () => {
  const store = createIdempotencyStore({ maxEntries: 1 });

  await store.execute(
    'contact-key-0006',
    'fingerprint-e',
    async () => successfulResult
  );

  const result = await store.execute(
    'contact-key-0007',
    'fingerprint-f',
    async () => successfulResult
  );

  assert.equal(result.type, 'capacity');
  assert.equal(store.size, 1);
});
