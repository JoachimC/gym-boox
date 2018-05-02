import {Response, Handler} from "aws-lambda";
import {BookPredefinedClassesHttpPort} from "./src/bookPreDefindedClasses/BookPredefinedClassesHttpPort";

const hello: Handler = async (): Promise<Response> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: Math.floor(Math.random() * 10)
        })
    };
};


const bookPreDefinedClasses: Handler = BookPredefinedClassesHttpPort.handle;

export {hello, bookPreDefinedClasses}