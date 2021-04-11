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
    })
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