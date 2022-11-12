import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
import get_connection from './db/index.ts'

const db = await get_connection()

const handler = async (request: Request): Promise<Response> => {
  return new Response('hello')
};

console.log("Listening on http://localhost:8000");
serve(handler);
