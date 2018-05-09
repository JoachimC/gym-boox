const cheerio = require('cheerio')
import {GymClass} from "./GymClass";

export namespace Timetable {
    export const parse = (rawTimetable: any): Array<GymClass> => {

        const html = cheerio.load(rawTimetable)
        return html('table[id="MemberTimetable"] tbody tr')
            .map((i: number, rawRow: any) => {

                // not closing around external variable = so need to store this somehow else
                const row = cheerio.load(rawRow);
                const dayHeader = row('tr.dayHeader td h5')
                if (dayHeader.length) {
                    cheerio.load(rawRow).attr('data-current-day', dayHeader.text().split(' ')[0].trim())
                }
                return rawRow
            })
            .not('.dayHeader')
            .not('.header')
            .map((i: number, rawRow: any) => {
                const row = cheerio.load(rawRow)
                const id = row('td span.col5Item a').attr('id').replace('price', '')
                const name = row('td span.col1Item a').text()
                const dayOfWeek = row.attr('data-current-day')
                // todo: just make this a time
                const hour = Number(row('td span.col0Item').text().substring(0, 2))
                //todo: what happens with waitlist items?
                //todo this is always false
                const rawIsBookable = row('td a[href="#"]');
                const isBookable = Boolean(rawIsBookable.length)
                return {id: id, name: name, dayOfWeek: dayOfWeek, hour: hour, isBookable: isBookable}
            })
    }

    export const classFilter = (gc: GymClass) => {
        return (gc.name === 'Ballet Barre' && gc.dayOfWeek === 'Tuesday' && gc.hour === 13) ||
            (gc.name === 'Aerial Yoga' && gc.dayOfWeek === 'Wednesday' && gc.hour === 13) ||
            (gc.name === 'Escalate' && gc.dayOfWeek === 'Thursday' && gc.hour === 13) ||
            (gc.name === 'Vinyasa Flow Yoga' && gc.dayOfWeek === 'Friday' && gc.hour === 13);
    }
}
