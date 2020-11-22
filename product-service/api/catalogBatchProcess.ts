import {SQSEvent, SQSHandler, SQSRecord} from "aws-lambda";

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    // const sqs = new AWS.SQS();
    const products = event.Records.map((record: SQSRecord) => record.body);
    console.log(JSON.stringify(products));
}
