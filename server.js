const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// call db "connector"
connectDB();

app.get('/', (req, res) => {
  res.send('Api is Running');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port  ${PORT}`);
});
