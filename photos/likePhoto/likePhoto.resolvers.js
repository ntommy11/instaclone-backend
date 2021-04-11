import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectResolver(async(_,{id},{loggedInUser})=>{
      const target_photo = await client.photo.findUnique({
        where:{
          id,
        }
      });
      if(!target_photo){
        return {
          ok: false,
          error: "Photo not found."
        }
      }
      // if user already liked the photo
      const like = await client.like.findUnique({
        where:{
          // double unique check
          pid_uid:{
            uid: loggedInUser.id,
            pid: id,
          }
        }
      });
      if(like){
        await client.like.delete({
          where:{
            pid_uid:{
              uid: loggedInUser.id,
              pid: id,
            }
          }
        });
      }else{
        await client.like.create({
          data:{
            user: {
              connect:{
                id: loggedInUser.id
              }
            },
            photo: {
              connect:{
                id: target_photo.id
              }
            }
          }
        })
      }
      return {
        ok: true
      }
    })
  }
}