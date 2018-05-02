import * as rp from 'request-promise-native';
import {CookieJar} from "request";

interface GymClass {
    Id: number
}

export class BookPredefinedClassesHandler {
    readonly baseUri = 'https://gymbox.legendonlineservices.co.uk';

    public async handle(): Promise<void> {
        const cookiejar = this.configureCookies();

        await this.login(cookiejar);
        const timetable = await this.getTimetable(cookiejar);
        const classToBook = this.findClass(timetable);
        await this.addClassToBasket(cookiejar, classToBook);
        await this.pay(cookiejar);
        await this.logout(cookiejar);
    }

    private configureCookies(): CookieJar {
        const cookiejar = rp.jar();
        cookiejar.setCookie('APP_LGD_COOKIE_TEST=true', this.baseUri);
        return cookiejar;
    }

    private async login(cookiejar: CookieJar) {
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

    private async logout(cookiejar: CookieJar) {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/Account/Logout`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            cookieJar: cookiejar,
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('logout failed')
            }
        }
        await rp.post(options, callback)
    }

    private async getTimetable(cookiejar: CookieJar) {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/BookingsCentre/MemberTimetable`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            cookieJar: cookiejar,
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 200) {
                throw new Error('get timetable failed')
            }
        }
        return await rp.post(options, callback);
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
            cookieJar: cookiejar,
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 200) {
                throw new Error('add class to basket failed')
            }
        }
        return await rp.post(options, callback);
    }

    private async pay(cookiejar: CookieJar) {
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/Basket/Pay`,
            headers: {
                'Cookie': cookiejar.getCookieString(this.baseUri)
            },
            cookieJar: cookiejar,
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('pay failed')
            }
        }
        return await rp.post(options, callback);
    }

}

