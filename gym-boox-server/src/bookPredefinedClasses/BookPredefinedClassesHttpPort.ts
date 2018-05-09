import {BookPredefinedClassesHandler} from "./BookPredefinedClassesHandler";
import {Response} from "aws-lambda";
import {env} from "process";
import {Credentials} from "./Credentials";

const credentials: Credentials = {
    UserName: <string>env.GYM_BOOX_USER_NAME,
    Password: <string>env.GYM_BOOX_PASSWORD
}

const bookPredefinedClassesHandler = new BookPredefinedClassesHandler(credentials);

export namespace BookPredefinedClassesHttpPort {
    export const handle = async (): Promise<Response> => {
        try {
            await bookPredefinedClassesHandler.handle();
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
