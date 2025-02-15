// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './schema';

// const connectionString = process.env.DATABASE_URL!;
// const client = postgres(connectionString);
// export const db = drizzle(client, { schema });

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const sql = neon(connectionString);
export const db = drizzle(sql);
