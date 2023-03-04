import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import urlExist from 'url-exist';
import URL from './models/urlModel.js';
import 'dotenv/config';
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/URL-shortener', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Database connected successfully');
});

const validateURL = async (req, res, next) => {
  const { url } = req.body;
  const isExist = await urlExist(url);
  if (!isExist) {
    return res.json({ message: 'Invalid URL', type: 'failure' });
  }
  next();
};

app.get('/urls', async (req, res) => {
  try {
    const urls = await URL.find({}, { _id: 0, __v: 0 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { target } = req.body;

  try {
    const url = await URL.findOne({ id });
    if (!url) {
      return res.json({ message: 'URL not found', type: 'failure' });
    }

    url.target = target;
    await url.save();
    res.json({ message: 'URL updated', type: 'success' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/', async (req, res) => {
  const urls = await URL.find({}, { _id: 0, __v: 0 });
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/link', validateURL, async (req, res) => {
  const { url } = req.body;

  let id = nanoid(6);

  let newURL = new URL({ url, id, hits: 0 });
  try {
    await newURL.save();
  } catch (err) {
    res.send('An error was encountered! Please try again.');
  }

  res.json({ message: `http://localhost:3001/${newURL.id}`, type: 'success' });
});

app.get('/:id', async (req, res) => {
  const id = req.params.id;

  const originalLink = await URL.findOne({ id });

  if (!originalLink) {
    return res.sendFile(__dirname + '/public/404.html');
  }

  originalLink.hits++;
  originalLink.save();

  const targetUrl = originalLink.target || originalLink.url;
  const isHttps = targetUrl.startsWith('https');
  if (isHttps) {
    res.redirect(307, targetUrl);
  } else {
    res.redirect(targetUrl);
  }
});

app.get('/api/urls', async (req, res) => {
  try {
    const urls = await URL.find({}, { _id: 0, __v: 0 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
