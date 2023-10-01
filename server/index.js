const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const helmet=require('helmet');
const morgan=require('morgan');
const router=require('./auth/routes')
const jwtd = require("jwt-decode");
const User =require("./models/User")

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan("common"));
app.use(cors());
app.use('/auth/google', router);
app.post("/google/mentee",async (req,res)=>{
  const {token} = req.body;
  
  const profile= jwtd(token)
console.log(profile)
  const user = await User.findOne({ email: profile.email });

  // If the user doesn't exist, create a new one
  if (!user) {
    const newuser = new User({
      name: profile.name,
      email: profile.email,
      role: 'mentee'
    });

    await newuser.save();}
})


app.post("/google/mentor",async (req,res)=>{
  const {token} = req.body;
  
  const profile= jwtd(token)
console.log(profile)
  const user = await User.findOne({ email: profile.email });

  // If the user doesn't exist, create a new one
  if (!user) {
    const newuser = new User({
      name: profile.name,
      email: profile.email,
      role: 'mentor'
    });

    await newuser.save();}
})

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

