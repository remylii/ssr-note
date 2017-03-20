import express from 'express';
import bodyParser from 'body-parser';

const app = new express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Get express server on port ' + PORT);
});

app.use(express.static('./public'));
