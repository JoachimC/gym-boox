import * as rp from 'request-promise-native';
import {FullResponse} from 'request-promise-native';
import {CookieJar} from "request";
import {Credentials} from "./Credentials";
import {Timetable} from "./Timetable";
import {GymClass} from "./GymClass";
import isBookable = Timetable.isBookable;

export class BookPredefinedClassesHandler {
    constructor(credentials: Credentials) {
        this.credentials = credentials
    }

    readonly baseUri = 'https://gymbox.legendonlineservices.co.uk';
    readonly credentials: Credentials;

    private delay = (milliseconds: number): Promise<number> => {
        return new Promise<number>(resolve => {
                setTimeout(() => {  resolve(); }, milliseconds);
            });
    }

    public async handle(): Promise<void> {
        // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const cookiejar = this.configureCookies();
        await this.login(cookiejar, this.credentials,);
        const timetable = await this.getTimetable(cookiejar);
        const classToBook = this.findClass(timetable);
        if (classToBook) {
            await this.addClassToBasket(cookiejar, classToBook);
            await this.delay(2000)
            await this.pay(cookiejar);
        }
        await this.logout(cookiejar);
    }

    private configureCookies = (): CookieJar => {
        return rp.jar()
    }

    private standardHeaders = (cookie: string | undefined): any => {
        const standard: any = {
            // 'Content-Type': 'application/x-www-form-urlencoded', // set automatically
            'Referer': `${this.baseUri}/enterprise/account/login`,
            'Cache-Control': 'no-cache',
            'Accept': 'text/html, application/xhtml+xml, image/jxr, */*',
            // 'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-GB,en;q=0.5',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
            'Connection': 'Keep-Alive'
        };
        if (cookie) {
            standard.Cookie = cookie
        }
        return standard

    }

    private async login(cookiejar: CookieJar, credentials: Credentials) {
        console.info(`login as '${credentials.UserName}'`)
        let headers = this.standardHeaders('APP_LGD_COOKIE_TEST=true')
        const options = {
            method: 'POST',
            uri: `${this.baseUri}/enterprise/account/login`,
            form: {
                'login.Email': credentials.UserName,
                'login.Password': credentials.Password
            },
            headers: headers,
            simple: false,
            // proxy: "http://127.0.0.1:8888"
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
        console.info(`logout`)
        let headers = this.standardHeaders(cookiejar.getCookieString(this.baseUri))
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/Account/Logout`,
            headers: headers,
            simple: false,
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 302) {
                throw new Error('logout failed')
            }
        }
        await rp.post(options, callback)
    }

    private async getTimetable(cookiejar: CookieJar): Promise<any> {
        console.info(`get timetable`)
        let headers = this.standardHeaders(cookiejar.getCookieString(this.baseUri))
        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/BookingsCentre/MemberTimetable`,
            headers: headers,
            simple: false,
            // proxy: "http://127.0.0.1:8888"
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (response.statusCode != 200) {
                throw new Error('get timetable failed')
            }
        }
        return await rp.get(options, callback)
    }

    private findClass(rawTimetable: any): GymClass | undefined {
        const gymClasses = Timetable.parse(rawTimetable)

        const bookableClasses = gymClasses
            .filter(gc => isBookable(gc));

        const matchingGymClasses = bookableClasses
            .filter(Timetable.classFilter)
        matchingGymClasses.forEach(gc => console.info(`found class: ${JSON.stringify(gc)}`))

        const matchingGymClass = matchingGymClasses[0];
        console.info(`returning class ${JSON.stringify(matchingGymClass)}`)
        return matchingGymClass
    }

    private async addClassToBasket(cookiejar: CookieJar, classToBook: GymClass) {
        console.info(`add class '${JSON.stringify(classToBook)}' to basket`)
        let headers = this.standardHeaders(cookiejar.getCookieString(this.baseUri))

        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/BookingsCentre/AddBooking?booking=${classToBook.id}&ajax=${Math.random()}`,
            headers: headers,
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
        console.info(`paying`)
        let headers = this.standardHeaders(cookiejar.getCookieString(this.baseUri))

        const options = {
            method: 'GET',
            uri: `${this.baseUri}/enterprise/Basket/Pay`,
            headers: headers,
            simple: false
        };

        const callback = (error: any, response: rp.FullResponse, body: any) => {
            if (!(response.statusCode == 302 || response.statusCode == 200)) {
                throw new Error('pay failed')
            }
        }
        return await rp.get(options, callback);
    }

}

