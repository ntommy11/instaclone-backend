export default {
  Comment:{
    isMine: ({uid},_,{loggedInUser})=>{
      if(!loggedInUser){
        return false;
      }
      return uid === loggedInUser.id
    }
  }
}