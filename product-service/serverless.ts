import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: 'database-nodejs-aws.cdl2gnqcvjzv.eu-west-1.rds.amazonaws.com',
      PG_PORT: 5432,
      PG_DATABASE: 'nodejs_aws_shop',
      PG_USERNAME: 'postgres',
      PG_PASSWORD: 'cOqkexNtYitfz0ZWV6Jo'
    },
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
    }
  }
}

module.exports = serverlessConfiguration;
