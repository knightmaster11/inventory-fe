const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
require('dotenv').config();

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your React app's domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync the database
db.sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch((err) => {
    console.error('Error synchronizing database:', err);
});

app.get('/', (req, res) => {
    res.send('Inventory App');
});

// Import routes
require('./routes/item.routes')(app);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
