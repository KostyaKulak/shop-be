import {APIGatewayProxyHandler} from "aws-lambda";
import {toSuccess} from "../../core/response";
import {AWS_REGION} from "../../core/constants";

const AWS = require('aws-sdk');
const {AWS_S3_BUCKET, catalogPath} = require("../constants/common");

export const importProductsFile: APIGatewayProxyHandler = async () => {
    const s3 = new AWS.S3({region: AWS_REGION, signatureVersion: 'v4'});

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
            resolve(toSuccess(url))
        })
    })
}
