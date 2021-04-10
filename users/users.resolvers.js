import client from "../client";

export default {
  User: {
    totalFollowing: (root)=>{
      //console.log(root); <- 루트는 이 resolvers의 부모 인스턴스, 즉 해당 유저 정보이다.
      return client.user.count({
        where:{
          followers:{
            some:{
              id: root.id,
            },
          },
        },
      });
    },
    totalFollowers: (root)=>{
      return client.user.count({
        where:{
          following:{
            some:{
              id: root.id,
            },
          },
        },
      });
    }, 
    isMe: (root, _, context)=>{
      if(!context.loggedInUser){
        return false;
      }
      return root.id===context.loggedInUser.id;
    },
    isFollowing: async (root,_,context)=>{
      if(!context.loggedInUser){
        return false;
      }
      const exists = await client.user.findUnique({
        where:{
          username: context.loggedInUser.username
        }
      }).following({
        where:{
          id:root.id
        }
      });
      return exists.length !== 0;
      
    }
  }
}
