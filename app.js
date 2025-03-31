import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use('/public', express.static('public'));

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 246,
    name: 'Made Up',
    birthdate: '2006-3-27',
    weight: '12',
    owner: 'You',
    image: 'https://loremflickr.com/320/240/cat',
  };
  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
