import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";
import { dbPath } from "../db/index.ts";

export const searchTypes = [
  'music',
  'movies',
  'tv',
  'games'
]

export const timeframeQueries: { [key: string]: string } = {
  daily: "timestamp BETWEEN datetime('now', '-24 hours') AND datetime('now', 'localtime')",
  weekly: "timestamp BETWEEN datetime('now', '-6 days') AND datetime('now', 'localtime')",
  monthly: "timestamp BETWEEN datetime('now', '-30 days') AND datetime('now', 'localtime')"
}

export const search = (type: string, timeframe: string) => {
  const db = new DB(dbPath)

  const searches = db.queryEntries<{ query: string, count: number }>(
    `SELECT query, COUNT(*) AS count
    FROM searches
    WHERE type = ? AND ${timeframeQueries[timeframe as keyof typeof timeframeQueries]}
    GROUP BY query
    ORDER BY count DESC
    LIMIT 100;`,
    [type]
  )

  db.close()

  return searches
}