import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation:{
    deleteComment: protectResolver(async(_,{id},{loggedInUser})=>{
      const target_comment = await client.comment.findUnique({
        where:{
          id,
        },
        select:{
          uid:true,
        }
      });
      if(!target_comment){
        return{
          ok: false,
          error: "comment Not Found."
        }
      }else if(target_comment.uid !== loggedInUser.id){
        return {
          ok: false,
          error: "Not Authorized."
        }
      }else{
        await client.comment.delete({
          where:{
            id,
          },
        });
        return{
          ok:true
        }
      }
    })
  }
}