import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../modules/core/schema';

// Esta función captura la conexión segura que Cloudflare inyecta mágicamente en nuestro código
export const getDb = () => {
  const env = getRequestContext().env as { DB: D1Database };
  return drizzle(env.DB, { schema });
};