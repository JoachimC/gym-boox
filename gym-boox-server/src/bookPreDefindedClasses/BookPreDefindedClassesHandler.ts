import * as rp from 'request-promise-native';

export class BookPredefinedClassesHandler {
    readonly baseUri = 'https://gymbox.legendonlineservices.co.uk';

    public async handle(): Promise<void> {
        var cookiejar = rp.jar();
        cookiejar.setCookie('APP_LGD_COOKIE_TEST=true', this.baseUri);
        const options = {
            method: 'POST',
            uri: `${this.baseUri}/enterprise/account/login`,
            form: {
                'login.Email': '-email-',
                'login.Password': '-password-'
            },
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded', // set automatically
                'Referer': `${this.baseUri}/enterprise/account/login`,
                'Cache-Control': 'no-cache',
                //Accept:text/html, application/xhtml+xml, image/jxr, */*
                //Accept-Encoding:gzip, deflate
                //Accept-Language:en-GB,en;q=0.5
                //User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko
                //Connection:Keep-Alive
                // 'Cookie': 'APP_LGD_COOKIE_TEST=true'
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            cookieJar: cookiejar,
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('login failed')
            }
        }
        await rp.post(options, callback)
    }
}

