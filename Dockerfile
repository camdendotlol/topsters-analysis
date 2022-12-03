FROM denoland/deno:latest

EXPOSE 8000
WORKDIR /app

ADD . .

RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write",  "index.ts"]