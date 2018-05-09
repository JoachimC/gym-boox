import 'mocha'
import {expect} from 'chai'
import {Timetable as Timetable} from "../src/bookPredefinedClasses/Timetable"
import {Timetable as timetableRecording } from "./gym-box-recordings/timetable"

describe("Timetable", () => {
    it("should parse classes from html page", function () {

        const gymClasses =  Timetable.parse(timetableRecording.getTimetable.response);

        expect(gymClasses.length).to.be.equal(1);
    });
});