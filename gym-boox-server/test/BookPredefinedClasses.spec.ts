import 'mocha';
import {expect} from 'chai';

import {bookPreDefinedClasses} from "../handler";

describe("Given a matching class", () => {
    it("Then book the class", async function () {
        const result = await bookPreDefinedClasses();
        expect(result.statusCode).to.be.equal(200);
    });
    it("Then don't book the class if it's already been booked")
});

describe("Given no matching classes", () => {
    it("Then make no bookings");
});

