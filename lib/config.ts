import { load } from "https://deno.land/std@0.218.2/dotenv/mod.ts";

await load({ export: true })

// It's safe to typecast these as long as we keep the checks below!
const config = {
  apiKey: Deno.env.get('API_KEY') as string,
  dbDir: Deno.env.get('DB_DIR') as string,
  environment: Deno.env.get('ENVIRONMENT') as string,
  port: Deno.env.get('PORT') as string
}

if (!config.apiKey) {
  console.error('Error: Need to set API_KEY environment variable.')
  Deno.exit(1)
}

if (!config.dbDir) {
  console.error('Error: Need to set DB_DIR environment variable.')
  Deno.exit(1)
}

if (!config.environment) {
  console.error('Error: Need to set ENVIRONMENT environment variable.')
  Deno.exit(1)
}

if (!config.port) {
  console.error('Error: Need to set PORT environment variable.')
  Deno.exit(1)
}

export default config
