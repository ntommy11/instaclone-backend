import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation:{
    unfollowUser: protectResolver(async(_,{username},{loggedInUser})=>{
      console.log(loggedInUser);
      const targetUser = await client.user.findUnique({
        where:{
          username:username
        },
      });
      console.log(targetUser);
      if(!targetUser){
        return{
          ok:false,
          error: "Can't unfollow user.",
        }
      }
      await client.user.update({
        where:{
          id:loggedInUser.id
        },
        data:{
          following:{
            disconnect:{
              username: username
            },
          },
        },
      });
      return {
        ok: true,
      }
    })
  }
}