export interface Route {
  path: string,
  callback: (...args: unknown[]) => unknown
}

export interface SearchItem {
  count: number,
  query: string
}