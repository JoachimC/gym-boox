import * as rp from 'request-promise-native';
import {CookieJar} from "request";
import {FullResponse} from "request-promise-native";

interface GymClass {
    Id: number
}

export interface Credentials {
    UserName: string,
    Password: string
}

export class BookPredefinedClassesHandler {
    constructor(credentials: Credentials) {
        this.credentials = credentials
    }

    readonly baseUri = 'https://gymbox.legendonlineservices.co.uk';
    readonly credentials: Credentials;

    public async handle(): Promise<void> {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const cookiejar = this.configureCookies();
        await this.login(cookiejar, this.credentials,);
        const timetable = await this.getTimetable(cookiejar);
        const classToBook = this.findClass(timetable);
        await this.addClassToBasket(cookiejar, classToBook);
        await this.pay(cookiejar);
        await this.logout(cookiejar);
    }

    private configureCookies(): CookieJar {
        const cookiejar = rp.jar()
        // const cookie = rp.cookie('APP_LGD_COOKIE_TEST=true')
        // if (cookie) {
        //     cookiejar.setCookie(cookie, this.baseUri)
        // }
        return cookiejar
    }

    private async login(cookiejar: CookieJar, credentials: Credentials) {
        const options = {
            method: 'POST',
            uri: `${this.baseUri}/enterprise/account/login`,
            form: {
                'login.Email': credentials.UserName,
                'login.Password': credentials.Password
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
                'Cookie': 'APP_LGD_COOKIE_TEST=true'
                // 'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            simple: false,
            proxy: "http://127.0.0.1:8888"
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('login failed')
            }
            this.getCookiesFromResponse(response, cookiejar)
        }
        await rp.post(options, callback)
    }

    private getCookiesFromResponse(response: FullResponse, cookiejar: CookieJar) {
        let cookies = response.headers["set-cookie"];
        if (!cookies) return

        if (!(cookies instanceof Array)) {
            cookies = [cookies]
        }
        cookies.forEach((c) => {
            const cookie = rp.cookie(c)
            if (cookie) {
                cookiejar.setCookie(cookie, this.baseUri)
            }
        })
    }

    private async logout(cookiejar: CookieJar) {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/Account/Logout`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            simple: false,
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('logout failed')
            }
        }
        await rp.post(options, callback)
    }

    private async getTimetable(cookiejar: CookieJar):Promise<any> {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/BookingsCentre/MemberTimetable`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            simple: false,
            proxy: "http://127.0.0.1:8888"
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 200) {
                throw new Error('get timetable failed')
            }
        }
        return await rp.get(options, callback);
    }

    private findClass(timetable: any): GymClass {
        return {Id: 1060498}
    }

    private async addClassToBasket(cookiejar: CookieJar, classToBook: GymClass) {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/BookingsCentre/AddBooking?booking=${classToBook.Id}`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 200) {
                throw new Error('add class to basket failed')
            }
            const responseMessage = JSON.parse(response.body)
            if (!responseMessage.Success) {
                throw new Error(`add class to basket failed: ${responseMessage.Message}`)
            }
        }
        return await rp.get(options, callback);
    }

    private async pay(cookiejar: CookieJar) {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/Basket/Pay`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('pay failed')
            }
        }
        return await rp.get(options, callback);
    }

}

