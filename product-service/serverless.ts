import type { Serverless } from 'serverless/aws';
import {AWS_REGION, AWS_SQS_QUEUE, AWS_STACK_ID} from "../core/constants";

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  resources: {
    Resources: {
      SQSQueue : {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: AWS_SQS_QUEUE
        }
      }
    },
    Outputs: {
      SQSQueueUrl :{
        Value: {Ref:'SQSQueue'}
      },
      SQSQueueArn: {
        Value: {'Fn::GetAtt': ['SQSQueue', 'Arn']}
      }
    }
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {Effect: 'Allow', Action: 'lambda:InvokeFunction', Resource: [`arn:aws:lambda:${AWS_REGION}:${AWS_STACK_ID}:function:product-service-dev-postProducts`]}
    ]

  },
  functions: {
    getProductsList: {
      handler: 'api/getProductsList.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    getProductsById: {
      handler: 'api/getProductsById.getProductsById',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            cors: true
          }
        }
      ]
    },
    postProducts: {
      handler: 'api/postProducts.postProducts',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: true
          }
        }
      ]
    },
    catalogBatchProcess: {
      handler: 'api/catalogBatchProcess.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn :{'Fn::GetAtt': ['SQSQueue', 'Arn']}
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
