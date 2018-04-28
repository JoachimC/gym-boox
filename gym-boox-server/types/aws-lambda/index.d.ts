declare module "aws-lambda" {

    export interface CognitoIdentity {
        cognitoIdentityId: string;
        cognitoIdentityPoolId: string;
    }

    export interface ClientContextClient {
        installationId: string;
        appTitle: string;
        appVersionName: string;
        appVersionCode: string;
        appPackageName: string;
    }

    export interface ClientContextEnv {
        platformVersion: string;
        platform: string;
        make: string;
        model: string;
        locale: string;
    }

    export interface ClientContext {
        client: ClientContextClient;
        Custom?: any;
        env: ClientContextEnv;
    }

    export interface Context {
        // Properties
        callbackWaitsForEmptyEventLoop: boolean;
        functionName: string;
        functionVersion: string;
        invokedFunctionArn: string;
        memoryLimitInMB: number;
        awsRequestId: string;
        logGroupName: string;
        logStreamName: string;
        identity?: CognitoIdentity;
        clientContext?: ClientContext;

        // Functions
        getRemainingTimeInMillis(): number;

        // Functions for compatibility with earlier Node.js Runtime v0.10.42
        // For more details see http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-using-old-runtime.html#nodejs-prog-model-oldruntime-context-methods
        done(error?: Error, result?: any): void;

        fail(error: Error | string): void;

        succeed(messageOrObject: any): void;

        succeed(message: string, object: any): void;
    }

    export type AsyncHandler<TEvent = any, TResult = any> =
        (event?: TEvent, context?: Context) => Promise<TResult>;

    export type Handler = AsyncHandler;
}