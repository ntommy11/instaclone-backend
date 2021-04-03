import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import client from "../../client"

export default {
  Mutation:{
    createAccount: async (_, {
      firstName,
      lastName,
      username,
      email,
      password,
    }) => {
      // 유저명이나 이메일이 이미 DB에 있는지 확인한다.
      try{
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username:username,
              },
              {
                email:email,
              }
            ]
          }
        })
        console.log(existingUser);
        if(existingUser){
          throw new Error("이 유저명은 이미 사용되고 있습니다.")
        }
        // 패스워드를 해싱
        /*
          create account : (1234) => hash('1234'):asd123234asdasd123 === asd123234asdasd123?
        */ 
        const salt = 10
        const uglyPassword = await bcrypt.hash(password, salt);
        console.log(uglyPassword);
        return client.user.create({
          data:{
            username,
            email,
            firstName,
            lastName,
            password:uglyPassword,
          }
        });
      }catch (e){
        return e;
      }
    },
  }
}