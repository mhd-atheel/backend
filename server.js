import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

//import plantRouter from "./routes/plant.routes.js";
import userRouter from "./routes/user.routes.js"
import plantRoute from "./routes/plant.routes.js"

const app = express();
const PORT = process.env.PORT || 8070;
dotenv.config()
//middleware
app.use(cors());
app.use(bodyParser.json());
//app.use('/plants', plantRouter )
app.use('/user', userRouter)
app.use('/plant', plantRoute)

//connect to DB
mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`SuccessFully Running PORT ${PORT}`)
    )
  )
  .catch((error) => console.log(error));

app.get('/',(req,res)=>{
    res.send("Hello")
})
