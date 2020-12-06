import {SQSEvent, SQSHandler, SQSRecord} from "aws-lambda";
import {validateAndCreateProducts} from "./validatateAndCreateProducts";

import AWS from 'aws-sdk';
import {AWS_REGION, AWS_SNS_TOPIC, AWS_STACK_ID} from "../../core/constants";

// @ts-ignore
export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    const products: any[] = event.Records.map((record: SQSRecord) => JSON.parse(record.body));
    const sns = new AWS.SNS({region: AWS_REGION});
    let publishingStatus = 'failed';
    try {
        await validateAndCreateProducts(JSON.stringify(products));
        publishingStatus = 'succeeded';
    } catch (e) {
        console.log('Products publishing error: ', JSON.stringify(e));
    }
    await sns
        .publish({
            Subject: `Products publishing`,
            Message: `${products.length} products are published`,
            MessageAttributes: {
                publishingStatus: {
                    DataType: 'String',
                    StringValue: publishingStatus
                }
            },
            TopicArn: `arn:aws:sns:${AWS_REGION}:${AWS_STACK_ID}:${AWS_SNS_TOPIC}`,
        })
        .promise();
}
