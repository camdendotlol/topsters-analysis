import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

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

export default env
