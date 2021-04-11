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
    }
  }
}