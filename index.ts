import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts"
import searchRouter from './controllers/searches/index.ts'
import DbSetup from "./db/index.ts"

const app = new Application()

const env = config()

// Apparently Deno's version of dotenv literally ONLY
// looks for the .env file, so you're screwed if you
// try to set normal environment variables.
// That stupid shortcoming is addressed below.
if (Object.keys(env).length === 0) {
  env['API_KEY'] = Deno.env.get("API_KEY") || ''
  env['DB_DIR'] = Deno.env.get("DB_DIR") || ''
  env['ENVIRONMENT'] = Deno.env.get("ENVIRONMENT") || ''
  env['PORT'] = Deno.env.get("PORT") || '8000'
}

const router = new Router()

console.log(`Database directory: ${env['DB_DIR']}`)

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

router.get('/', (ctx) => {
  ctx.response.body = 'Something cool is coming here soon!'
})

app.use(router.routes())
app.use(searchRouter.routes())
app.use(router.allowedMethods())

console.log(`Listening on port ${env['PORT']}...`)

if (env['ENVIRONMENT'] === 'development') {
  await app.listen({ port: parseInt(env['PORT']), secure: false })
} else {
  await app.listen({ port: parseInt(env['PORT']) })
}

console.log("Listening on http://localhost:8000")
