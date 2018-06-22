import {Handler} from "aws-lambda";
import {BookPredefinedClassesHttpPort} from "./src/bookPredefinedClasses/BookPredefinedClassesHttpPort";
import {BookPredefinedClassesCronPort} from "./src/bookPredefinedClasses/BookPredefinedClassesCronPort";

const bookPredefinedClassesHttp: Handler = BookPredefinedClassesHttpPort.handle;
const bookPredefinedClasses: Handler = BookPredefinedClassesCronPort.handle;

export {bookPredefinedClasses, bookPredefinedClassesHttp}