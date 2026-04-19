import type { Config } from 'drizzle-kit';

export default {
  schema: './src/modules/core/schema.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
} satisfies Config;