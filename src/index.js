require("dotenv").config();
const express = require("express");
const connect = require("./configs/db");
const app = express();
const port = process.env.PORT || 1234;

/**=============DONT FORGET TO USE this line ======================= */
app.use(express.json());
/**=======================CONTROLLERS================================ */
const { register, login } = require("./controllers/auth.controller");
//=====
app.post("/register", register);
app.post("/login", login);
app.listen(port, async () => {
  try {
    await connect();
    console.log(`connected on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
