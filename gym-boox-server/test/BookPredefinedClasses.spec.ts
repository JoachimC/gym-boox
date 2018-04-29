import 'mocha';
import {expect} from 'chai';

import {bookPreDefinedClasses} from "../handler";
import * as nock from "nock";
import {Authentication} from "./gym-box-recordings/authentication";

describe("Book Predefined Classes", () => {

    before(() => {
        nock.disableNetConnect()
    })
    after(() => {
        nock.enableNetConnect()
    })

    // beforeEach(() => {
    //  nock.activate();
    // });

    afterEach(() => {
        nock.cleanAll();
        // nock.restore();
    });


    describe("Given a matching class", () => {

        it("Then book the class", async function () {
            nock.define([Authentication.login, Authentication.logout]);
            const result = await bookPreDefinedClasses();
            expect(result.statusCode).to.be.equal(200, result.body);
        });

        it("Then don't book the class if it's already been booked")
    });

    describe("Given no matching classes", () => {
        it("Then make no bookings");
    });
});

