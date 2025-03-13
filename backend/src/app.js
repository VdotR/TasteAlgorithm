const express = require('express');
const app = express();

// Import Routes
const apiRoutes = require('./routes/api.routes');

// Add JSON support
app.use(express.json())

// Routes
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js API');
  });
  
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;