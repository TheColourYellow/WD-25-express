import express from 'express';
const app = express();

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

export default app;
