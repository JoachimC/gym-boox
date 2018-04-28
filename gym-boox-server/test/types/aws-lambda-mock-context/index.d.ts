declare module "aws-lambda-mock-context" {

    export = context;

    function context(options?: IOptions): IContext;

    interface IContext {
        Promise: Promise<any>;
        callbackWaitsForEmptyEventLoop: boolean;
        functionName: string;
        functionVersion: string;
        invokedFunctionArn: string;
        memoryLimitInMB: number;
        awsRequestId: string;
        invokeid: string;
        logGroupName: string;
        logStreamName: string;
        getRemainingTimeInMillis: () => number;
        succeed(result: any): Promise<any>;
        fail(err: any): Promise<any>;
        done(err: any, result: any): Promise<any>;
    }

    interface IOptions {
        region: string;
        account: string;
        functionName: string;
        functionVersion: string;
        memoryLimitInMB: number;
        alias?: string;
    }
}
