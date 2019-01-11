const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

module.exports = function(app, test) {
  app.post('/render', bodyParser.json(), function(req, res) {
    const { result } = req.body;
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    const index = fs.readFileSync(`${indexPath}`, 'utf8');
    const script = `<script type="text/javascript">var data = ${JSON.stringify(result)}</script>`;
    res.json({
      error: null,
      markup: index.replace("</head>", `${script}</head>`)
    });
  });
};

