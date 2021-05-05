import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation:{
    createComment: protectResolver(async(_,{pid,payload},{loggedInUser})=>{
      const target_photo = await client.photo.findUnique({
        where:{
          id:pid
        },
        select:{
          id:true,
        }
      });
      if(!target_photo){
        return {
          ok: false,
          error: "Photo not found."
        }
      }
      const newComment = await client.comment.create({
        data:{
          payload,
          photo:{
            connect:{
              id:pid,
            }
          },
          user: {
            connect:{
              id:loggedInUser.id
            }
          }
        }
      });
      return {
        ok: true,
        id: newComment.id,
      }
      
    })
  }
}