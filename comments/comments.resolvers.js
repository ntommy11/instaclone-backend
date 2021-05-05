import client from "../client";

export default {
  Comment:{
    isMine: ({uid},_,{loggedInUser})=>{
      if(!loggedInUser){
        return false;
      }
      return uid === loggedInUser.id
    },
    user: ({uid})=>client.user.findUnique({
      where:{
        id: uid,
      }
    })
  }
}