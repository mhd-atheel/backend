//import from packages
const express = require("express");
const mongoose = require("mongoose");

//import from other files
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");

//init
const PORT = 3000;
const app = express();
const DB =
  "";

//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);

//connnection
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected successfully!");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});
