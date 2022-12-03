FROM denoland/deno:latest

VOLUME /opt/topster-stats/data

EXPOSE 8000
WORKDIR /app

ADD . .

RUN deno cache index.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "--allow-write",  "index.ts"]