import { createClient } from '@libsql/client/.';
import { drizzle } from 'drizzle-orm/libsql';
import { Hono } from 'hono';


const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
