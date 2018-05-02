import {BookPredefinedClassesHandler} from "./BookPredefinedClassesHandler";
import {Response} from "aws-lambda";

const bookPredefinedClassesHandler = new BookPredefinedClassesHandler();

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
