const AWS = require('aws-sdk');
const {CORS_HEADERS} = require("../constants/headers");
const {AWS_S3_BUCKET, catalogPath} = require("../constants/common");

module.exports = {
    importProductsFile: async function () {
        const s3 = new AWS.S3({region: 'eu-west-1'});
        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: catalogPath,
            Expires: 60,
            ContentType: 'text/csv'
        };

        return new Promise((resolve, reject) => {
            s3.getSignedUrl('putObject', params, (error, url) => {
                if (error) {
                    reject(error);
                }

                resolve({
                    headers: CORS_HEADERS,
                    statusCode: 200,
                    body: url
                })
            })
        })
    }
}
