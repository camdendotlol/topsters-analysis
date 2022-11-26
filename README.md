# stats.topsters.org

This application is a work-in-progress data viewer for topsters.org. It is not currently publicly available.

It will offer charts and graphs to visualize the latest search trends over customizable timeframes.

## Stack

Topsters Stats uses [Deno](https://deno.land) with the [oak](https://deno.land/x/oak@v11.1.0/mod.ts) package for routing and the [sqlite](https://deno.land/x/sqlite@v3.7.0) package for interacting with the SQLite database. I've tried to keep it lightweight because it's not going to become anything fancy.

At the moment I haven't begun on the frontend, but I want to try something a little different. Maybe Svelte, Remix, or just a really spartan HTML page.

## License

This application is licensed under MIT, so you can use it for your own projects if you want, even though it isn't very useful on its own because my Topsters backend is currently closed-source.
