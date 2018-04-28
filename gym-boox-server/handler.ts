import {Handler} from "aws-lambda";

interface HelloResponse {
    statusCode: number;
    body: string;
}

const hello: Handler = async (): Promise<HelloResponse> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: Math.floor(Math.random() * 10)
        })
    };
};

export {hello}