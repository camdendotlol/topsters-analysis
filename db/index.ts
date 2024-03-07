import * as path from "https://deno.land/std@0.166.0/path/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import config from "../lib/config.ts";

export const dbPath = path.format({ root: '/', dir: config.dbDir, name: 'db.sqlite' })

// Get the existing DB or create one if it doesn't exit.
const DbSetup = async () => {
  try {
    console.log(`Attempting to open database at ${dbPath}`)
    await Deno.lstat(dbPath)
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.log('No existing database found. Creating a new one.')
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
