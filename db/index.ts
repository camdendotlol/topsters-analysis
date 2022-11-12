import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Get the existing DB or create one if it doesn't exit.
const init_db = async () => {
  try {
    const file = await Deno.open('db.sqlite', { read:true })
    return file
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      const created = await Deno.create('db.sqlite')
      return created
    }
  }
}

const get_connection = async () => {
  await init_db()

  const db = new DB('db.sqlite')

  db.execute(`
    CREATE TABLE IF NOT EXISTS people (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  return db
}

export default get_connection
