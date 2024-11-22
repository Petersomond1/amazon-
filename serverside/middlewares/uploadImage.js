import {v4 as uuidv4} from 'uuid';
import path from 'path';
import dotenv from 'dotenv';
import s3Client from '../config/s3CLient.js';





// mIddleware to upload images to s3
const uploadMiddleware = async (file) => {
    try {
        const uniqureFileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const fileBuffer = file.buffer;

        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: uniqureFileName,
            Body: fileBuffer,
            ContentType: file.mimetype,
        };

        // upload the file to s3
        await s3Client.send(new PutObjectCommand(uploadParams));

        //construct the s3 url for the upload file
        const fileUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uniqureFileName}`;

        return {fileUrl};

    } catch (error) {
        console.log('error in uploadMiddleware', error);
        throw error;
    }
}

export default uploadMiddleware;