import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

const env = config()

export const dbPath = path.format({ dir: env['DB_DIR'], name: 'db.sqlite'})

// Get the existing DB or create one if it doesn't exit.
const DbSetup = async () => {
  try {
    await Deno.open(dbPath, { read:true })
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      await Deno.create(dbPath)
    }
  }

  const db = new DB(dbPath)
  
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
