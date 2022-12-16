import { Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'
import { DB } from 'https://deno.land/x/sqlite@v3.7.0/mod.ts'
import { dbPath } from "../../db/index.ts";
import { search, searchTypes, timeframeQueries } from '../../lib/searches.ts'

const router = new Router()

router
  .get('/api/searches/:type/:timeframe', (ctx) => {

    const type = ctx.params.type

    const timeframe = ctx.params.timeframe

    if (!timeframeQueries[timeframe]) {
      ctx.response.status = 400
      return ctx.response.body = { error: 'invalid timeframe' }
    }

    if (!searchTypes.includes(type)) {
      ctx.response.status = 400
      return ctx.response.body = { error: 'invalid search type' }
    }

    const searches = search(type, timeframe )

    ctx.response.body = { data: searches }
  })
  .post('/api/searches/:type', async (ctx) => {
    ctx.response.type = 'application/json'
    const type = ctx.params.type

    if (!searchTypes.includes(type)) {
      ctx.response.status = 400
      return ctx.response.body = { error: 'invalid search type' }
    }

    const data = await ctx.request.body({ type: 'json' }).value
    
    if (!data?.query || data.query === '') {
      ctx.response.body = { error: 'missing query' }
    } else {
      const db = new DB(dbPath)
      
      db.query(
        "INSERT INTO searches (query, type) VALUES (?, ?)", [data.query.toLowerCase(), type]
      )

      db.close()

      ctx.response.body = { status: 'ok' }
    }
  })

export default router
