import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectResolver(async(_,{file,caption},{loggedInUser})=>{
      let hashtag_objs = null;
      if(caption){
        // parse caption
        hashtag_objs = processHashtags(caption);
        // get or create hashtags
      }
      const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
      return client.photo.create({
        data: {
          file:fileUrl,
          caption,
          user: {
            connect:{
              id: loggedInUser.id,
            }
          },
          ...(hashtag_objs.length > 0 && {hashtags:{connectOrCreate:hashtag_objs}})
        }
      })
      // save the photo with the parsed hashtags
      // add the photo to the hashtags
    })
  }
}