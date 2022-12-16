import { SearchItem } from "../types.ts";
import { search } from "./searches.ts"

const homepage = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Topsters.org Stats</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body style="background:black">
  <main class="container" style="margin-top:20vh">
    <table class="table table-dark table-striped">
      <thead>
        <th scope="col">#</th>
        <th scope="col">Searches</th>
        <th scope="col">Query</th>
      </thead>
      <tbody>
      {data}
      </tbody>
    </table>
  </main>
</body>
</html>
`

export const serveHomepage = () => {
  const searches = search('music', 'monthly')

  const table = searches.map((item: SearchItem, index) => (
    `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.count}</td>
        <td>${item.query}</td>
      </tr>
    `
  )).join('')

  return homepage.replace('{data}', table)
}