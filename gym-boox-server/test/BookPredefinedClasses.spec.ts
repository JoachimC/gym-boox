import 'mocha'
import {expect} from 'chai'

import {bookPredefinedClasses} from "../handler"
import {Authentication} from "./gym-box-recordings/authentication"
import {Timetable} from "./gym-box-recordings/timetable"
import {Basket} from "./gym-box-recordings/basket"
import nock = require('nock')
import {NockDefinition} from "nock"

describe("Book Predefined Classes", () => {

    before(() => {
        nock.disableNetConnect()
    })
    after(() => {
        nock.enableNetConnect()
    })

    // beforeEach(() => {
    //  nock.activate()
    // })

    afterEach(() => {
        nock.cleanAll()
        // nock.restore()
    })


    describe("Given a matching class", () => {

        it("Then book the class", async function () {
            const nockDefine = (definition: NockDefinition) => {
                nock(definition.scope)
                    .post(definition.path, definition.body, {reqheaders: definition.reqheaders})
                    .reply(definition.status || 0, definition.response, definition.headers)
            }

            nockDefine(Authentication.login)
            nockDefine(Timetable.getTimetable)
            nockDefine(Basket.addClassToBasket)
            nockDefine(Basket.pay)
            nockDefine(Authentication.logout)

            const result = await bookPredefinedClasses()
            expect(result.statusCode).to.be.equal(200, result.body)
            nock.isDone()
        });

        it("Then don't book the class if it's already been booked")
    });

    describe("Given no matching classes", () => {
        it("Then make no bookings")
    });
});

