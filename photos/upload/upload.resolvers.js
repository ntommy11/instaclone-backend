import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectResolver(async(_,{file,caption},{loggedInUser})=>{
      let hashtag_objs = null;
      if(caption){
        // parse caption
        const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
        console.log(hashtags)
        hashtag_objs = hashtags.map(hashtag => ({where:{hashtag}, create:{hashtag}}));
        // get or create hashtags
      }
      return client.photo.create({
        data: {
          file,
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