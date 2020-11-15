const AWS = require('aws-sdk');
const {AWS_S3_BUCKET, catalogPath} = require("../constants/common");
const csv = require("csv-parser");
module.exports = {
    importFileParser: async function (event) {
        const s3 = new AWS.S3({region: 'eu-west-1'});
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
                        await s3.copyObject({
                            Bucket: AWS_S3_BUCKET,
                            CopySource: AWS_S3_BUCKET + '/' + record.s3.object.key,
                            Key: record.s3.object.key.replace('uploaded', 'parsed'),
                        }).promise();

                        await s3.deleteObject({
                            Bucket: AWS_S3_BUCKET,
                            Key: record.s3.object.key
                        }).promise();
                    }
                    resolve();
                });
        });


        return new Promise((resolve) => {
            resolve({
                statusCode: 202
            });
        });
    }
}
