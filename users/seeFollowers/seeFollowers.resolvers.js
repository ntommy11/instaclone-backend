import client from "../../client"

export default {
  Query:{
    seeFollowers: async(_,{username,page})=>{
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

      const followers = await client.user.findUnique({
        where:{username}
      }).followers({
        take: 5,
        skip: (page-1)*5,
      });

      const countFollowers = await client.user.count({
        where:{
          following:{
            some:{
              username
            }
          }
        }
      });

      return{
        ok: true,
        followers,
        totalPages: Math.ceil(countFollowers/5),
      }
    }
  }
}