import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { awsConfig } from './server.config';

const { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_S3_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } = awsConfig;

const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata(_req, file, callback) {
            callback(null, { fieldName: file.fieldname });
        },
        acl: 'public-read',
        key: function (_req, file, callback) {
            const originalName = file.originalname;
            const extension = originalName.split('.').pop();
            const uniqueFileName = `${Date.now().toString()}.${extension}`;
            callback(null, uniqueFileName);
        }
    })
});

export default s3;