import express = require('express');
import { ShortenUrl } from './service/shortenUrl.service';
var bodyParser = require('body-parser');

const shortenUrlService= new ShortenUrl();
const app: express.Application = express();

app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/health', function (req, res) {
  res.send({'status':'Alive!'});
});
app.get('/url', async function (req, res) {
  console.log(req.body);
  const shortUrl= await shortenUrlService.getAllUrl();
  console.log(shortUrl);
  res.send(shortUrl);
});
app.post('/history/:shortUrl', async function (req, res) {
  const shortUrl= await shortenUrlService.getAllHistory(req.params.shortUrl);
  res.send(shortUrl);
});
app.post('/url', async function (req, res) {
  const shortUrl= await shortenUrlService.saveShortenUrl(req.body.originalUrl);
  console.log(shortUrl);
  res.send({'responseUrl':shortUrl});
});

app.get('/:shortUrl', async function (req, res) {
  console.log(req.params.shortUrl)
  const actualUrl= await shortenUrlService.getActualUrl(req.params.shortUrl);
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'] ;
  await shortenUrlService.storeHitory(req.params.shortUrl, ip as any, userAgent as any);
  res.redirect(actualUrl);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});