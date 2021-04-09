import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token)=>{
  try{
    if(!token){
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({
      where: {
        id:id
      }
    })
    if (user){
      return user;
    }else{
      return null;
    }
  }catch{
    return null;
  }
}
/*
export const protectResolver = (user) => {
  if(!user){
    throw new Error("You need to login");
  }
}
*/
export const protectResolver = (resolver)=> (root,args,context,info)=>{
  //console.log(context?.loggedInUser);
  if(!context.loggedInUser){
    return {
      ok:false,
      error:"please login to perform this action"
    }
  }
  return resolver(root,args,context,info);
}