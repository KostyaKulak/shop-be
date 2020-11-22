import {SQSEvent, SQSHandler, SQSRecord} from "aws-lambda";
import AWS from 'aws-sdk';
import {AWS_REGION, AWS_STACK_ID} from "../../core/constants";
import {Product} from "../resources/product/product.model";

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    const products: Product[] = event.Records.map((record: SQSRecord) => JSON.parse(record.body));
    const lambda = new AWS.Lambda({region: AWS_REGION});
    lambda.invoke({
        FunctionName: `arn:aws:lambda:${AWS_REGION}:${AWS_STACK_ID}:function:product-service-dev-postProducts`,
        Payload: JSON.stringify(products)
    }, function (error, data) {
        if (error) {
            console.log(error)
        }
        if (data.Payload) {
            console.log('Successfully added')
        }
    });
}
