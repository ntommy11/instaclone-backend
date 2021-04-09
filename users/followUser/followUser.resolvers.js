import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation:{
    followUser: protectResolver(async (_, {username},{loggedInUser})=>{
      const userToFollow = await client.user.findUnique({
        where:{
          username
        }
      }); // 만약 DB에 username이 없으면 null을 반환. 있으면 해당 user를 반환.
      if(!userToFollow){
        return{
          ok:false,
          error: "That user does not exist.",
        }
      }
      await client.user.update({
        where:{
          id: loggedInUser.id
        },
        data:{
          following:{
            connect:{
              username: username,
            },
          },
        },
      });
      return{
        ok:true,
      };
    })
  }
}