import client from "../client"

export default {
  Photo : {
    user: (thisPhoto)=>{
      return client.user.findUnique({
        where:{
          id: thisPhoto.userId
        }
      })
    },
    hashtags: (thisPhoto)=>{
      return client.hashtag.findMany({
        where:{
          photos:{
            some:{
              id: thisPhoto.id
            }
          }
        }
      })
    },
    likes: ({id})=>client.like.count({
      where:{
        pid: id
      }
    }),
    comments: ({id})=>client.comment.findMany({
      where:{
        pid: id
      },
      include:{
        user: true,
      }
      
    }),
    numComment:({id})=>client.comment.count({where:{pid:id}}),
    isMine: ({userId},_,{loggedInUser})=>{
      if(!loggedInUser){
        return false;
      }
      return userId === loggedInUser.id
    },
    isLiked: async ({id},_,{loggedInUser})=>{
      if(!loggedInUser){
        return false;
      }
      const ok = await client.like.findUnique({
        where:{
          pid_uid:{
            pid: id,
            uid:loggedInUser.id
          }
        },
        select:{
          id:true
        }
      });
      if(ok){
        return true;
      }else{
        return false;
      }
    }
  },
  Hashtag: {
    photos: ({ id }, { page }, { loggedInUser }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
    totalPhotos: (thisHashtag)=>client.photo.count({
      where:{
        hashtags:{
          some: {
            id: thisHashtag.id
          }
        }
      }
    })
  }
}