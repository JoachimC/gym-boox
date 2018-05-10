import {BookPredefinedClassesHandler} from "./BookPredefinedClassesHandler";
import {Response} from "aws-lambda";
import {env} from "process";
import {Credentials} from "./Credentials";
import moment from 'moment'
import 'moment-timezone'

const credentials: Credentials = {
    UserName: <string>env.GYM_BOOX_USER_NAME,
    Password: <string>env.GYM_BOOX_PASSWORD
}

const bookPredefinedClassesHandler = new BookPredefinedClassesHandler(credentials);

export namespace BookPredefinedClassesCronPort {
    export const handle = async (): Promise<Response> => {
        try {
            const localHour = moment().tz('Europe/London').get('hour')
            if (localHour == 7) {
                await bookPredefinedClassesHandler.handle();
            } else {
                console.log(`not around 7am local time. Hour is ${localHour}`)
            }
            return {
                statusCode: 200
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }

    }
}
