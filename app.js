const express=require ('express')
const app=express()
const cors = require('cors');
const dotenv=require('dotenv')
const MongoDB=require('./connection/mongodb')
const adminRoute=require('./routes/adminRoutes')
dotenv.config()

const PORT = process.env.PORT || 5000;
MongoDB()

app.use(cors());
app.use(express.json());

app.use('/api', adminRoute);



app.listen(PORT,()=>console.log(`nodemon running port${PORT}`))
