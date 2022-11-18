import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import get_connection from '../../db/index.ts'

const router = new Router()

const db = await get_connection()

router
  .get('/api/searched_albums', (ctx) => {
    const albumSearches = db.query(
      `SELECT * FROM album_searches ORDER BY searches`
    )

    ctx.response.type = 'application/json'
    ctx.response.body = { data: albumSearches }
  })

export default router
