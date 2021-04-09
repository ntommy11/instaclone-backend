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
        //console.log(avatar);
        //console.log(loggedInUser);
        let avatarUrl = null;
        if(avatar){
          const {filename, createReadStream} = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          console.log(filename, createReadStream);
          const readStream = createReadStream();
          const writeStream = fs.createWriteStream(process.cwd()+"/uploads/"+ newFilename);
  
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }


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
            ...(avatarUrl && {avatar: avatarUrl})
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