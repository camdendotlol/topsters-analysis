export interface Route {
  path: string,
  callback: (...args: unknown[]) => unknown
}
