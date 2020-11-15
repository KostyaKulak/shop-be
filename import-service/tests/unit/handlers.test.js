const {describe, beforeEach, afterEach, it, expect} = require('@jest/globals')

const AWS = require('aws-sdk-mock');
const {catalogPath} = require("../../constants/common");

describe('Get signed URL', () => {
    let importProductsFile;

    beforeEach(() => {
        AWS.mock('S3', 'getObject', Buffer.from(require('fs').readFileSync('test.csv')));
    });

    afterEach(() => {
        AWS.restore('S3');
    });

    it('should return correct URL successfully.', (done) => {
        jest.isolateModules(() => {
            importProductsFile = require('../../api/importProductsFile')
        })
        return AWS.handler({objectKey: ''}, {}, (err, result) => {
            expect(result).toContain(catalogPath);
            done();
        });
    })
})
