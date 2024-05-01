import pkg from 'pg';
const { Pool } = pkg;
import { Kysely, PostgresDialect } from 'kysely'
import 'dotenv/config';
import { DB } from './types';

const dialect = new PostgresDialect({
    pool: new Pool({
      database: process.env.DB_NAME,
      host: process.env.DB_WRITER_ENDPOINT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      max: 10,
    })
  });

export const db = new Kysely<DB>({dialect});