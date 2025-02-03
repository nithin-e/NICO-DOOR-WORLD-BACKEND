const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoDB = require('./connection/mongodb');
const bodyParser = require("body-parser");
const adminRoute = require('./routes/adminRoutes');
const nocache = require('nocache');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(nocache());
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000 
    }
  })
);

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
