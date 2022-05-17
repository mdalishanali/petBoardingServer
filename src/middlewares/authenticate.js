const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ message: "Please provide the authorization token" });
  }

  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res.status(400).send({
      message: "----Please provide the valid authorization token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  let user;
  try {
    user = await verifyToken(token);
    //console.log("user", user);
  } catch (error) {
    return res.status(400).send({
      message: "dPlease provide the valid authorization token or not valid",
    });
  }
  req.user = user.user;
  next();
  /**user {
  user: {
    _id: '62690b6fdc700f8f9bb42fd3',
    email: 'b',
    password: '$2a$08$41c9n8scV/5kbVssITzNEOgvQ7jnRXG1Rl7LV6YtUSMDU60m5I8Yu',
    role: 'admin',
    createdAt: '2022-04-27T09:22:55.546Z',
    updatedAt: '2022-04-27T09:22:55.546Z'
  },
  iat: 1651051437
} */
};

const verifyToken = (token) => {
  //const key = process.env.JWT_SECRET_KEY || "PetBoarding";
  return new Promise((res, rej) => {
    let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "PetBoarding";
    jwt.verify(token, JWT_SECRET_KEY, function (error, user) {
      if (error) return rej(err);
      //here you get the user
      return res(user);
    });
  });
};

module.exports = authenticate;
