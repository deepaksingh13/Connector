const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Db
connectDB();

// Init Middleware
app.use(express.json({ extended : false})); 

app.get('/',(req,res) => res.send('API running prop'));

app.use('/api/user', require('./routes/api/user'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running at PORT '+PORT));