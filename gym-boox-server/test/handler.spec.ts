import 'mocha';
import {expect} from 'chai';

// import mockContext = require('aws-lambda-mock-context');
import {hello} from '../handler';

describe("hello", () => {
    it("should return message and number", async function () {
        // const ctx = mockContext();

        const result = await hello();

        expect(result.statusCode).to.be.equal(200);

        const body = JSON.parse(result.body);
        expect(body.message).to.be.at.least(0);
        expect(body.message).to.be.at.most(9);
    });
});
