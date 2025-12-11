const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "El email es requerido!"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor ingresa un email valido!",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida!"],
    minLength: [8, "Almenos 8 caracteres!"],
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;
});

module.exports = mongoose.model("User", userSchema);
