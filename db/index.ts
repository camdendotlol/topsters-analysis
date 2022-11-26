import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

// Get the existing DB or create one if it doesn't exit.
const DbSetup = async () => {
  try {
    await Deno.open('db.sqlite', { read:true })
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.create('db.sqlite')
    }
  }

  const db = new DB('db.sqlite')
  
  db.execute(`
    CREATE TABLE IF NOT EXISTS searches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT,
      type TEXT CHECK( type IN ('music', 'movies', 'tv', 'games')),
      timestamp DATETIME DEFAULT (datetime('now', 'localtime'))
    );
  `);
}

export default DbSetup
