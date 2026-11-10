
const DEFAULT_TTL_MS = 10 * 60 * 1000;
const DEFAULT_MAX_ENTRIES = 1000;

/**
 * Crea un registro de idempotencia en memoria.
 *
 * En Vercel el registro se comparte únicamente dentro de una misma instancia
 * caliente. No reemplaza un almacenamiento distribuido.
 */
export const createIdempotencyStore = ({
  ttlMs = DEFAULT_TTL_MS,
  maxEntries = DEFAULT_MAX_ENTRIES,
  now = () => Date.now()
} = {}) => {
  const entries = new Map();

  const removeExpiredEntries = () => {
    const currentTime = now();

    for (const [key, entry] of entries.entries()) {
      if (
        entry.status === 'completed' &&
        currentTime - entry.completedAt >= ttlMs
      ) {
        entries.delete(key);
      }
    }
  };

  const execute = async (key, fingerprint, operation) => {
    removeExpiredEntries();

    const existing = entries.get(key);

    if (existing) {
      if (existing.fingerprint !== fingerprint) {
        return { type: 'conflict' };
      }

      if (existing.status === 'completed') {
        return {
          type: 'replayed',
          result: existing.result
        };
      }

      if (existing.status === 'pending') {
        const result = await existing.promise;

        return {
          type: 'replayed',
          result
        };
      }
    }

    if (entries.size >= maxEntries) {
      return { type: 'capacity' };
    }

    const entry = {
      fingerprint,
      status: 'pending',
      promise: null,
      result: null,
      completedAt: null
    };

    // La operación se programa después de registrar la clave para que otra
    // solicitud simultánea encuentre el estado "pending".
    const operationPromise = Promise.resolve().then(operation);

    entry.promise = operationPromise;
    entries.set(key, entry);

    try {
      const result = await operationPromise;

      if (result?.cache === true) {
        entry.status = 'completed';
        entry.result = result;
        entry.completedAt = now();
        entry.promise = null;
      } else {
        entries.delete(key);
      }

      return {
        type: 'executed',
        result
      };
    } catch (error) {
      entries.delete(key);
      throw error;
    }
  };

  return {
    execute,
    clear: () => entries.clear(),
    get size() {
      return entries.size;
    }
  };
};

const getSharedIdempotencyStore = () => {
  const storeKey = '__portfolioContactIdempotencyStore';

  if (
    !globalThis[storeKey] ||
    typeof globalThis[storeKey].execute !== 'function'
  ) {
    globalThis[storeKey] = createIdempotencyStore();
  }

  return globalThis[storeKey];
};

export const runContactIdempotently = (key, fingerprint, operation) => {
  return getSharedIdempotencyStore().execute(
    key,
    fingerprint,
    operation
  );
};
