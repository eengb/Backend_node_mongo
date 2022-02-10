<<<<<<< HEAD
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
=======
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761

//Käyttäjän schema

const userSchema = mongoose.Schema({
  sights: [{ type: mongoose.Schema.Types.ObjectId, ref: "sight" }],
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

<<<<<<< HEAD

=======
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
export default User;
=======
module.exports = User;
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761
