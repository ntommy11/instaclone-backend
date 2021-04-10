import client from "../../client";

export default {
  Query:{
    seeFollowing: async(_,{username, lastId})=>{
      // Check if target user exist
      const targetUser = await client.user.findUnique({
        where: {username},
        select: {id:true},
      });
      if(!targetUser){
        return{
          ok: false,
          error: "target user not found."
        }
      }
      // Pagination
      const following = await client.user.findUnique({
        where:{username}
      }).following({
        take: 2,
        skip: lastId? 1:0, // because cursor includes the last record
        ...(lastId && {cursor:{id:lastId}}),
      });

      return {
        ok:true,
        following,
      }
    }
  }
}