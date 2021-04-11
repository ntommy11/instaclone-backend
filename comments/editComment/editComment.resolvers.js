import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectResolver(async(_,{id,payload},{loggedInUser})=>{
      const target_comment = await client.comment.findUnique({
        where:{
          id,
        },
        select:{
          uid: true,
        }
      });
      if(!target_comment){
        return{
          ok:false,
          error: "Comment Not Found."
        }
      }else if(target_comment.uid !== loggedInUser.id){
        return {
          ok: false,
          error: "Not Authorized."
        }
      }else{
        await client.comment.update({
          where:{
            id,
          },
          data:{
            payload
          }
        }) 
        return {
          ok: true
        }
      }
    })
  }
}