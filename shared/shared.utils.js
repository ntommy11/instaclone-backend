import AWS from 'aws-sdk';

AWS.config.update({
  credentials:{
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
});

export const uploadToS3 = async (file, uid, folderName)=>{
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${uid}-${Date.now()}-${filename}`;
  const upload = await new AWS.S3().upload({
    Bucket: "instaclone-bucket1125",
    Key: objectName,
    ACL: "public-read",
    Body: readStream,
  }).promise();
  return upload.Location;
}