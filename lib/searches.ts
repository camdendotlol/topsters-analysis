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
