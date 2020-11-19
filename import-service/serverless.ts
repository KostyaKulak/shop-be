import type {Serverless} from 'serverless/aws';
import {AWS_S3_BUCKET} from "./constants/common";

const serverlessConfiguration: Serverless = {
    service: {
        name: 'import-service'
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: {
                forceExclude: 'aws-sdk',
            }
        }
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs12.x',
        stage: 'dev',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        iamRoleStatements: [
            {Effect: 'Allow', Action: 's3:ListBucket', Resource: [`arn:aws:s3:::${AWS_S3_BUCKET}`]},
            {Effect: 'Allow', Action: 's3:*', Resource: [`arn:aws:s3:::${AWS_S3_BUCKET}/*`]}
        ]
    },
    functions: {
        importProductsFile: {
            handler: 'api/importProductsFile.importProductsFile',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'import',
                        cors: true,
                        request: {
                            parameters: {
                                querystrings: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            ]
        },
        importFileParser: {
            handler: 'api/importFileParser.importFileParser',
            events: [
                {
                    s3: {
                        bucket: AWS_S3_BUCKET,
                        event: 's3:ObjectCreated:*',
                        rules: [
                            {prefix: 'uploaded/', suffix: ''}
                        ],
                        existing: true
                    }
                }
            ]
        }
    }
}

module.exports = serverlessConfiguration;