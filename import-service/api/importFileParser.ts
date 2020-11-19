import {S3Event, S3Handler} from "aws-lambda";
import {toSuccess} from "../../core/response";

const AWS = require('aws-sdk');
const {AWS_S3_BUCKET, catalogPath, AWS_S3_REGION} = require("../constants/common");
const csv = require("csv-parser");

// @ts-ignore
export const importFileParser: S3Handler = async (event: S3Event) => {
    const s3 = new AWS.S3({region: AWS_S3_REGION, signatureVersion: 'v4' });

    const params = {
        Bucket: AWS_S3_BUCKET,
        Key: catalogPath,
    };

    const s3Stream = await s3.getObject(params).createReadStream();

    await new Promise((resolve, reject) => {
        s3Stream.pipe(csv())
            .on('data', (data) => console.log(data))
            .on('error', (error) => reject(error))
            .on('end', async () => {
                for (const record of event.Records) {
                    try {
                        await s3.copyObject({
                            Bucket: AWS_S3_BUCKET,
                            CopySource: `${AWS_S3_BUCKET}/${record.s3.object.key}`,
                            Key: record.s3.object.key.replace('uploaded', 'parsed'),
                        }).promise();

                        await s3.deleteObject({
                            Bucket: AWS_S3_BUCKET,
                            Key: record.s3.object.key
                        }).promise();
                    } catch (error) {
                        console.log('Error:', error)
                    }
                }
                resolve();
            });
    });

    return toSuccess({message: 'Success'}, {statusCode: 202})
}
