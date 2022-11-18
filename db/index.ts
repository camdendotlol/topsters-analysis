import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

let connection: null | DB = null

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
  if (!connection) {
    await init_db()
  
    const db = new DB('db.sqlite')
  
    db.execute('DROP TABLE IF EXISTS album_searches')
  
    db.execute(`
      CREATE TABLE album_searches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        searches INTEGER
      )
    `);

    connection = db
  }

  return connection
}

export default get_connection
