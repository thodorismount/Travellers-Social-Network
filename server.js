const express = require('express');
const connectDB = require('./config/db');
const app = express();

// call db "connector"
connectDB();

app.get('/', (req, res) => {
  res.send('Api is Running');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on post  ${PORT}`);
});
