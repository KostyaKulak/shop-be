import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import {AWS_S3_BUCKET, catalogPath} from "../../constants/common";
import {AWS_REGION} from "../../../core/constants";

describe("importProductFile tests", () => {
    beforeAll(() => {
        AWSMock.mock("S3", "getSignedUrlPromise", (_method, _, callback) => {
            callback(null, {
                data: `https://bucket-name.s3.${AWS_REGION}.amazonaws.com/${catalogPath}`,
            });
        });
    });

    afterAll(() => {
        AWSMock.restore("S3");
    });

    test("should mock getSignedUrlPromise from S3", async () => {
        const s3 = new AWS.S3({region: AWS_REGION});
        const path = `${catalogPath}`;
        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: path,
            Expires: 60,
            ContentType: "text/csv",
        };

        await expect(
            s3.getSignedUrlPromise("putObject", params)
        ).resolves.toContain(`s3.${AWS_REGION}.amazonaws.com/${catalogPath}`);
        await expect(
            s3.getSignedUrlPromise("putObject", params)
        ).resolves.toContain("Signature=");
        await expect(
            s3.getSignedUrlPromise("putObject", params)
        ).resolves.toContain("AWSAccessKeyId=");
    });
});
