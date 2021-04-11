import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation:{
    deletePhoto: protectResolver(async(_,{id},{loggedInUser})=>{
      const target_photo = await client.photo.findUnique({
        where:{
          id,
        },
        select:{
          userId:true,
        }
      });
      if(!target_photo){
        return{
          ok: false,
          error: "Photo Not Found."
        }
      }else if(target_photo.userId !== loggedInUser.id){
        return {
          ok: false,
          error: "Not Authorized."
        }
      }else{
        await client.photo.delete({
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