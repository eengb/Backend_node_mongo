import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

//Käyttäjän schema

// prettier-ignore
const userSchema = mongoose.Schema({
  sights: [{ type: mongoose.Schema.Types.ObjectId, ref: "sight" }],
  username: {type: String, required: true, unique: true,},
  email: {type: String, required: true, unique: true,},
  firstname: {type: String, required: true,},
  surname: {type: String, required: true,},
  imageUrl: String,
  passwordHash: String,
});

userSchema.plugin(uniqueValidator);

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

export default User;
