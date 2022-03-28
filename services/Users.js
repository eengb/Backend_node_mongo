import User from "../models/user.js";

//Toimii + testattu
export const deleteUser = async (sightId, userId) => {
    const user = await User.deleteOne({ _id: sightId, user:userId});
    return user
  };
  
  //Turha, hoidetaan frontin puolella
  export const findUsers = async () => {
    const users = await User.find({}).populate("user");
    return users;
  };
  
  //Tämä toimii
  export const updateUser = async (userId, data) => {
    //prettier-ignore
    const result = await User.findOneAndUpdate({ _id: userId}, data, { new:true })
    if (!result) throw new Error("Not Found");
    return result;
  };