require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connect = require("./configs/db");
const app = express();
const port = process.env.PORT || 1234;
app.use(cors());
/**=============DONT FORGET TO USE this line ======================= */
app.use(express.json());
/**=======================CONTROLLERS================================ */
const { register, login } = require("./controllers/auth.controller");
const entityController = require("./controllers/entiry.controller");
const petController = require("./controllers/pet.controller");
const bookingController = require("./controllers/booking.controller");
const citiesController = require("./controllers/city.contoller");
/**=======================Routehandler================================ */

app.post("/register", register);
app.post("/login", login);
app.use("/entity", entityController);
app.use("/pet", petController);
app.use("/booking", bookingController);
app.use("/city", citiesController);
/**=======================Manual Connection================================ */
app.listen(port, async () => {
  try {
    await connect();
    console.log(`connected on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
