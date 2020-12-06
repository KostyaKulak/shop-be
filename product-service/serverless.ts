import type {Serverless} from 'serverless/aws';
import {AWS_REGION, AWS_SNS_TOPIC, AWS_SQS_QUEUE} from "../core/constants";

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
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: AWS_SQS_QUEUE,
          ReceiveMessageWaitTimeSeconds: 20
        }
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: AWS_SNS_TOPIC
        }
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'kulak.konstantin@mail.ru',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            publishingStatus: 'succeeded'
          }
        }
      },
      SNSSubscriptionFailedPublishing: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'kkulak24@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
          FilterPolicy: {
            publishingStatus: 'failed'
          }
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
    runtime: AWS_REGION,
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: "sqs:*",
        Resource: [{arn: {'Fn::GetAtt': ['SQSQueue', 'Arn']}}]
      }
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
