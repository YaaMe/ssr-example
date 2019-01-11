const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const port = 3000;

app.post('/render', bodyParser.json(), function(req, res) {
  const path = '/Users/zhujie/workspace/github/django-react/django_react/render_react/node_server';
  const { result } = req.body;
  const Table = fs.readFileSync(`${path}/Table.js`, 'utf8');
  // const Dialog = fs.readFileSync(`${path}/Dialog.js`, 'utf8');
  const head = `<head>
    <title>My page</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
    <script src="https://unpkg.com/react@latest/umd/react.development.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@material-ui/core/umd/material-ui.development.js" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/babel-standalone@latest/babel.min.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  </head>`;
  const markup = `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  ${head}
  <body>
    <div id="root"></div>
    <script type="text/babel">
    ${Table}
    ReactDOM.render(<App data={${JSON.stringify(result)}}/>, document.getElementById('root'));
    </script>
  </body>
</html>`;
  res.json({error: null, markup });
});

app.listen(port, () => console.log(`listening on port ${port}`));
