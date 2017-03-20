const express = require('express');
const http = require('http');
const _ = require('lodash');
const app = new express();
const PORT = process.env.PORT || 8000;


let count = 0;
const countTemplate = `<span id="count"><%= count %></span>`;
const template =
`<div>
  こんにちは、あなたは${countTemplate}番目のお客様です。
</div>
<button id="button">count up</button>

<script>
  // rendering client side.
  const countCompiled = ${_.template(countTemplate)};
  document.getElementById('button').addEventListener('click', () => {
    // XHR request
    const req = new XMLHttpRequest();
    req.onload = (e) => {
      const count = document.getElementById('count');
      const result = JSON.parse(e.target.response);

      count.innerHTML = countCompiled(result);
    };
    req.open('GET', '/api/count');
    req.send();
  });
</script>`;

const compiled = _.template(template);

// count up request
app.use('/api/count', (req, res, next) => {
  res.json({ count: count++ });
});

app.use((req, res, next) => {
  // rendering server side
  http.get({
    port: PORT,
    path: '/api/count'
  }, (response) => {
    let data = '';
    response.on('readable', () => {
      const chunck = response.read();
      if (chunck) {
        data += chunck;
      }
    });
    response.on('end', () => {
      res.send(compiled(JSON.parse(data)));
    });
  });
});

app.listen(PORT, () => {
  console.log('GET express server on port ' + PORT);
});
