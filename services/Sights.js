import Sight from "../models/sight.js";
import User from "../models/user.js";

export const deleteSight = async (sightId, userId) => {
    const sight = await Sight.findById({ _id: sightId });
    if (userId !== sight.user.toString()) throw new Error("Not Authorized");
    await Sight.deleteOne({ _id: sightId });
  };
  
  export const findSights = async () => {
    const sights = await Sight.find({}).populate("user");
    return sights;
  };
  
  export const addSight = async (data, userId) => {
    const sight = new Sight(data);

    //error test
    if (body.destination === undefined) throw new Error("destination missing");
    if (body.destination === undefined) throw new Error("country missing");
    if (body.destination === undefined) throw new Error("description missing");
    if (body.destination === undefined) throw new Error("picture missing");

    const user = await User.findById(userId);
    sight.user = user.id;
    const result = await sight.save();
    user.sights = user.sights.concat(result.id);
    await user.save();
    return result;
  };
  
  export const updateSight = async (sightId, data) => {
    //prettier-ignore
    const result = await Sight.findByIdAndUpdate({ _id: sightId }, data, { new:true })
    if (!result) throw new Error("Not Found");
    return result;
  };