const cheerio = require('cheerio')
import {GymClass} from "./GymClass";

export namespace Timetable {
    export const parse = (rawTimetable: any): Array<GymClass> => {

        const html = cheerio.load(rawTimetable)
        let currentDay: string = ''
        return html('table[id="MemberTimetable"] tbody tr')
            .map((i: number, rawRow: any) => {
                const dayHeader = cheerio.load(rawRow)('tr.dayHeader td h5')
                if (dayHeader.length) {
                    currentDay = dayHeader.text().split(' ')[0].trim()
                }
                return rawRow
            })
            .not('.dayHeader')
            .not('.header')
            .map((i: number, rawRow: any) => {
                const row = cheerio.load(rawRow)
                const id = row('td span.col5Item a').attr('id').replace('price', '')
                const name = row('td span.col1Item a').text()
                // todo: just make this a time
                const hour = Number(row('td span.col0Item').text().substring(0, 2))
                //todo: what happens with waitlist items?
                //todo this is always false
                const isBookable = Boolean(row('td a[href="#"]').length)
                return {id: id, name: name, dayOfWeek: currentDay, hour: hour, isBookable: isBookable}
            })
    }

    export const classFilter = (gc: GymClass) => {
        return (gc.name === 'Ballet Barre' && gc.dayOfWeek === 'Tuesday' && gc.hour === 13) ||
            (gc.name === 'Aerial Yoga' && gc.dayOfWeek === 'Wednesday' && gc.hour === 13) ||
            (gc.name === 'Escalate' && gc.dayOfWeek === 'Thursday' && gc.hour === 13) ||
            (gc.name === 'Vinyasa Flow Yoga' && gc.dayOfWeek === 'Friday' && gc.hour === 13);
    }
}
