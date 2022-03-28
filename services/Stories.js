import Story from "../models/story.js";


//Toimii + testattu
export const deleteStory = async (storyId, userId) => {
    const story = await Story.deleteOne({ _id: storyId, user:userId});
    return story
  };
  
  

  
  //Tämä toimii
  export const updateStory = async (storyId, userId, data) => {
    //prettier-ignore
    const result = await Story.findOneAndUpdate({ _id: storyId, user:userId }, data, { new:true })
    if (!result) throw new Error("Not Found");
    return result;
  };