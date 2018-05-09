import 'mocha'
import {expect} from 'chai'
import {Timetable as Timetable} from "../src/bookPredefinedClasses/Timetable"
import {Timetable as timetableRecording } from "./gym-box-recordings/timetable"
import {GymClass} from "../src/bookPredefinedClasses/GymClass";

describe("Timetable", () => {
    it("should parse classes from html page", function () {

        const classFilter = (gc : GymClass) => {
            return  (gc.name === 'No-Gi' && gc.dayOfWeek === 'Tuesday' && gc.hour === 20);
        }
        const gymClasses =  Timetable.parse(timetableRecording.getTimetable.response);
        expect(gymClasses.length).to.be.greaterThan(0);

        const notMondayClasses = gymClasses.filter(x => (x.dayOfWeek !== 'Monday'))
        expect(notMondayClasses.length).to.be.greaterThan(0);

        const bookableGymClasses = gymClasses.filter(x => x.isBookable)
        expect(bookableGymClasses.length).to.be.greaterThan(0);
        expect(gymClasses.length).to.be.greaterThan(bookableGymClasses.length);

        const filteredGymClasses = bookableGymClasses.filter(classFilter)
        expect(filteredGymClasses.length).to.be.equal(1);
    });
});