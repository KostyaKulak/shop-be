import {SQSEvent, SQSHandler, SQSRecord} from "aws-lambda";
import {validateAndCreateProducts} from "./validatateAndCreateProducts";

// @ts-ignore
export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
    const products: any[] = event.Records.map((record: SQSRecord) => JSON.parse(record.body));
    return validateAndCreateProducts(JSON.stringify(products));
}
