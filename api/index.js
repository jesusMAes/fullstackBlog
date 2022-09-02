const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const bodyParser = require('body-parser')

dotenv.config()

mongoose.connect(process.env.MONGO_URL,
   {useNewUrlParser:true, 
    useUnifiedTopology: true,
   }).then(console.log("conected to MongoDB"))
     .catch((err) => console.log(err))


//read json in body
app.use(bodyParser.json())
//route midleware
app.use('/api/auth', authRoute)
app.use("/api/users", userRoute)

app.listen("5000", () => {
  console.log("backend is running on port 5000")
})