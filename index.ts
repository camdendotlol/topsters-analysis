import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import get_connection from './db/index.ts'
import albumRouter from './controllers/albums/index.ts'

const app = new Application()
const db = await get_connection()
const router = new Router()

db.execute(`INSERT INTO album_searches (name, searches)
  VALUES
    ('jubilee', 900),
    ('ok computer', 712),
    ('highway 61 revisited', 200)
`)

router
  .get('/', (context) => {
    const people = db.query('SELECT * FROM albums;')
    context.response.body = people
  })

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
});

app.use(router.routes())
app.use(albumRouter.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })

console.log("Listening on http://localhost:8000")
