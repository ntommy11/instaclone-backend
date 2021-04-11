import client from "../../client";

export default {
  Query : {
    seePhotoComments: (_,{id})=>client.comment.findMany({
      where:{
        pid: id,
      },
      orderBy:{
        createdAt: "asc",
      },
    }),
  }
}