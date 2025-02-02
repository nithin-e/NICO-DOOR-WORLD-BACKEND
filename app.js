const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoDB = require('./connection/mongodb');
const bodyParser = require("body-parser");
const adminRoute = require('./routes/adminRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
MongoDB();

// Configure middleware
app.use(cors()); // Allow CORS
app.use(bodyParser.json({ limit: "100mb" })); // Set JSON payload size limit
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true })); // For URL-encoded data
app.use(express.json()); // Handle JSON payloads (optional but redundant if using body-parser)

// Routes
app.use('/api', adminRoute);

// Start server
app.listen(PORT, () => console.log(`nodemon running port ${PORT}`));
