const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const bookRoutes = require('./routes/books');
const memberRoutes = require('./routes/member');
const circulationRoutes = require('./routes/circulation');
const overdueRoutes = require('./routes/overdue');

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());


app.use('/api/books',bookRoutes);
app.use('/api/member',memberRoutes);
app.use('/api/circulation',circulationRoutes);
app.use('/api/overdue',overdueRoutes)
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});