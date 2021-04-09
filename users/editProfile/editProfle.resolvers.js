import fs from "fs";
import bcrypt from 'bcrypt';
import client from "../../client";
import jwt from 'jsonwebtoken';
import { protectResolver } from '../users.utils';



export default {
  Mutation: {
    editProfile: protectResolver(
      async (_, {
        firstName,
        lastName,
        username,
        email,
        password:newPassword,
        bio,
        avatar
      }, { loggedInUser, protectResolver }) => {
        //protectResolver(loggedInUser);
        console.log(avatar);
        console.log(loggedInUser);

        const {filename, createReadStream} = await avatar;
        console.log(filename, createReadStream);
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(process.cwd()+"/uploads/"+filename);

        readStream.pipe(writeStream);


        let uglyPassword = null;
        if(newPassword){
          uglyPassword = await bcrypt.hash(newPassword, 10);
          console.log(uglyPassword);
        }
        const updatedUser = await client.user.update({

          where:{
            id: loggedInUser.id,
          },
          data:{
            firstName:firstName,
            lastName:lastName,
            username:username,
            email:email,
            bio:bio,
            ...(uglyPassword && {password: uglyPassword}),
          } 
        });
        if(updatedUser.id){
          return {
            ok:true,
          }
        }else{
          return {
            ok:false,
            error: "could not update profile",
          }
        }
      }
    ),
  },
};