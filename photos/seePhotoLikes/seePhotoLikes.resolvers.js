import client from "../../client";

export default {
  Query:{
    seePhotoLikes: async(_,{id})=>{
      const likes = await client.like.findMany({
        where:{
          pid:id,
        },
        select:{
          user: true,
        }
      });
      return likes.map(like => like.user);
    }
  }
}