const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const MongoDB = require('./connection/mongodb');
const bodyParser = require("body-parser");
const adminRoute = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
MongoDB();



app.use(cors({
    origin: '*', 
    credentials: true  
  }));


app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true })); 
app.use(express.json()); 
app.use(cookieParser()); 
// Routes
app.use('/api', adminRoute);

// Start server
app.listen(PORT, () => console.log(`nodemon running port ${PORT}`));
