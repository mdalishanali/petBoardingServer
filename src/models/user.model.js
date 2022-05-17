const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name:{type:String, required:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { versionKey: false, timestamps: true }
);
/** */
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  let hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = new mongoose.model("user", userSchema);
module.exports = User;
