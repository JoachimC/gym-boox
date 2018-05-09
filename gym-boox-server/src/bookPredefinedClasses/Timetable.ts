const cheerio = require('cheerio')
import {GymClass} from "./GymClass";

export namespace Timetable {
    export const parse = (rawTimetable: any): Array<GymClass> => {
        const html = cheerio.load(rawTimetable)

        const rows = html('table[id="MemberTimetable"] tbody tr');

        let currentDay: string = ''
        for (let row of rows.toArray()) {
            const r = cheerio(row);
            let candidate = r.find('tr.dayHeader td h5').text().trim()
            if (candidate.length) {
                currentDay = candidate;
            } else {
                r.attr('data-current-day', currentDay)
            }
        }

        const results = rows
            .not('.dayHeader')
            .not('.header')
            .map((i: number, rawRow: any) => {
                const row = cheerio(rawRow)
                const id = row.find('td span.col5Item a').attr('id').replace('price', '')
                const name = row.find('td span.col1Item a').text()
                const date = row.attr('data-current-day')
                const time = row.find('td span.col0Item').text().trim().substring(0, 5)
                const status = row.find('td a.col6Item').text();
                return <GymClass>{id: id, name: name, date: date, time: time, status: status}
            });

        return results.toArray()
    }

    export const hourOfClass = (gc: GymClass): Number => {
        return Number(gc.time.substring(0, 2))
    }

    export const dayOfClass = (gc: GymClass): string => {
        return gc.date.split(' ')[0]
    }

    export const isBookable = (gc: GymClass): boolean => {
        return gc.status === 'Book'
    }

    export const classFilter = (gc: GymClass) => {
        return (gc.name === 'Ballet Barre' && dayOfClass(gc) === 'Tuesday' && hourOfClass(gc) === 13) ||
            (gc.name === 'Aerial Yoga' && dayOfClass(gc) === 'Wednesday' && hourOfClass(gc) === 13) ||
            (gc.name === 'Escalate' && dayOfClass(gc) === 'Thursday' && hourOfClass(gc) === 13) ||
            (gc.name === 'Vinyasa Flow Yoga' && dayOfClass(gc) === 'Friday' && hourOfClass(gc) === 13);
    }
}
