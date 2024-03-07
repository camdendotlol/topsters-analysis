import { Application, Router } from "https://deno.land/x/oak@14.2.0/mod.ts"
import searchRouter from './controllers/searches/index.ts'
import DbSetup from "./db/index.ts"
import { serveHomepage } from "./lib/client.ts";
import config from "./lib/config.ts";

const app = new Application()

const router = new Router()

console.log(`Database directory: ${config.dbDir}`)

// Set up the database
await DbSetup()

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
});

// Require API key for anything other than GET
app.use(async (ctx, next) => {
  if (ctx.request.method !== 'GET') {
    const token = ctx.request.headers.get('Authorization')

    if (!token || token !== config.apiKey) {
      console.log('Recieved request with invalid or missing API key.')
      ctx.response.status = 401
      return ctx.response.body = { error: 'Missing or invalid API key' }
    }
  }

  await next();
})

router.get('/', (ctx) => {
  ctx.response.body = serveHomepage()
})

app.use(router.routes())
app.use(searchRouter.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${config.port}...`)

if (config.environment === 'development') {
  await app.listen({ port: parseInt(config.port), secure: false })
} else {
  await app.listen({ port: parseInt(config.port) })
}

console.log("Listening on http://localhost:8000")
