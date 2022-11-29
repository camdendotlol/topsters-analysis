import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts"
import searchRouter from './controllers/searches/index.ts'
import DbSetup from "./db/index.ts"

const app = new Application()
const env = config()
const router = new Router()

// Set up the database
await DbSetup()

if (!env['API_KEY']) {
  console.error('Error: Need to set API_KEY environment variable.')
  Deno.exit(1)
}

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
});

// Require API key for anything other than GET
app.use(async (ctx, next) => {
  if (ctx.request.method !== 'GET') {
    const token = ctx.request.headers.get('Authorization')
  
    if (!token || token !== env['API_KEY']) {
      console.log('Recieved request with invalid or missing API key.')
      ctx.response.status = 401
      return ctx.response.body = { error: 'Missing or invalid API key' }
    }
  }

  await next();
})

app.use(searchRouter.routes())
app.use(router.allowedMethods())

if (env['ENVIRONMENT'] === 'development') {
  await app.listen({ port: 8000, secure: false })
} else {
  await app.listen({ port: 8000 })
}

console.log("Listening on http://localhost:8000")
