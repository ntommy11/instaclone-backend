import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectResolver(async(_,{id,caption},{loggedInUser})=>{

      // 1. 사진을 수정하려는 사람이 사진의 주인인지 확인한다.
      const target_photo = await client.photo.findUnique({
        where:{
          id
        },
        include:{
          hashtags: {
            select:{
              hashtag: true,
            }
          }
        },
      });
      console.log("target_photo=",target_photo);
      if(target_photo.userId !== loggedInUser.id){
        return{
          ok:false,
          error:"Not allowed to edit"
        }
      }
      // 2.
      await client.photo.update({
        where:{
          id,
        },
        data:{
          caption,
          hashtags:{
            disconnect: target_photo.hashtags,
            connectOrCreate: processHashtags(caption)
          }
        },
      });
      return {
        ok: true,
      }
    })
  }
}