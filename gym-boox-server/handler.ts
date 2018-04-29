import {Response, Handler} from "aws-lambda";
import {BookPredefinedClassesHandler} from "./src/bookPreDefindedClasses/BookPreDefindedClassesHandler";


const hello: Handler = async (): Promise<Response> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: Math.floor(Math.random() * 10)
        })
    };
};

const bookPredefinedClassesHandler = new BookPredefinedClassesHandler();

const bookPreDefinedClasses: Handler = async (): Promise<Response> => {
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

};

export {hello, bookPreDefinedClasses}