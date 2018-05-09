import {GymClass} from "./GymClass";

export namespace Timetable {
    export const parse = (rawTimetable: any): Array<GymClass> => {

        return [{id: 10, name: 'fish', dayOfWeek: 'wednesday', hour: 13, isBookable: true}]
    }
}
