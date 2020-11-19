import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import {AWS_S3_BUCKET, catalogPath} from "../../constants/common";
import {importProductsFile} from "../../api/importProductsFile";
import {AWS_S3_REGION} from "../../../core/constants";

describe("importProductFile tests", () => {
    const name = "catalog.csv";

    beforeAll(() => {
        AWSMock.mock("S3", "getSignedUrlPromise", (_method, _, callback) => {
            callback(null, {
                data: `https://bucket-name.s3.${AWS_S3_REGION}.amazonaws.com/${catalogPath}`,
            });
        });
    });

    afterAll(() => {
        AWSMock.restore("S3");
    });

    test("should test importProductsFile handler", async () => {
        const event = {queryStringParameters: {name}};

        await expect(
            // @ts-ignore
            importProductsFile(event, null, null)
        ).resolves.toMatchSnapshot();
    });

    test("should mock getSignedUrlPromise from S3", async () => {
        const s3 = new AWS.S3({region: AWS_S3_REGION});
        const path = `${catalogPath}`;
        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: path,
            Expires: 60,
            ContentType: "text/csv",
        };

        await expect(
            s3.getSignedUrlPromise("putObject", params)
        ).resolves.toContain(`s3.${AWS_S3_REGION}.amazonaws.com/${catalogPath}`);
        await expect(
            s3.getSignedUrlPromise("putObject", params)
        ).resolves.toContain("Signature=");
        await expect(
            s3.getSignedUrlPromise("putObject", params)
        ).resolves.toContain("AWSAccessKeyId=");
    });
});
