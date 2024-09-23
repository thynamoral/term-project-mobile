import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to upload image to S3
export const uploadToS3 = async (file) => {
  const filename = `${Date.now()}_${file.originalname}`;
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    return fileUrl;
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw new Error("Error uploading file");
  }
};

// Function to delete image from S3
export const deleteFromS3 = async (filename) => {
  const deleteParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
  };

  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
    console.log(`File ${filename} deleted successfully from S3`);
  } catch (err) {
    console.error("Error deleting file from S3:", err);
    throw new Error("Error deleting file");
  }
};

// Function to update image in S3
export const updateToS3 = async (oldFilename, newFile) => {
  try {
    // First, delete the old file
    await deleteFromS3(oldFilename);

    // Then, upload the new file
    const newFileUrl = await uploadToS3(newFile);

    return newFileUrl;
  } catch (err) {
    console.error("Error updating image in S3:", err);
    throw new Error("Error updating image");
  }
};
