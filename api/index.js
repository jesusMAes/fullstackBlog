const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const catRoute = require('./routes/categories');
const bodyParser = require('body-parser');
const multer = require('multer')

dotenv.config()

mongoose.connect(process.env.MONGO_URL,
   {useNewUrlParser:true, 
    useUnifiedTopology: true,
   }).then(console.log("conected to MongoDB"))
     .catch((err) => console.log(err))

//handle images from posts
const storage = multer.diskStorage({
  destination:(req, file, callback) =>{
    callback(null,"images")
  },
  filename:(req,file,cb) => {
    cb(null,req.body.name)
  }
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res) => {
  res.status(200).json("file uploaded")
})

//read json in body
app.use(bodyParser.json());
//route midleware
app.use('/api/auth', authRoute);
app.use("/api/users", userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', catRoute);

app.listen("5000", () => {
  console.log("backend is running on port 5000")
})