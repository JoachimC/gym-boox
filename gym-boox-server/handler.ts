import {Response, Handler} from "aws-lambda";
import {BookPredefinedClassesHttpPort} from "./src/bookPredefinedClasses/BookPredefinedClassesHttpPort";
import {BookPredefinedClassesCronPort} from "./src/bookPredefinedClasses/BookPredefinedClassesCronPort";

const hello: Handler = async (): Promise<Response> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: Math.floor(Math.random() * 10)
        })
    };
};

const bookPredefinedClassesHttp: Handler = BookPredefinedClassesHttpPort.handle;
const bookPredefinedClasses: Handler = BookPredefinedClassesCronPort.handle;

export {hello, bookPredefinedClasses, bookPredefinedClassesHttp}