import {NockDefinition} from "nock";

export namespace Authentication {
    export const login: NockDefinition = {
        scope: 'https://gymbox.legendonlineservices.co.uk',
        method: 'POST',
        path: '/enterprise/account/login',
        body: 'login.Email=-email-&login.Password=-password-',
        status: 302,
        response: `<html>
            <head>
                <title>Object moved</title>
            </head>
            <body>
                <h2>Object moved to <a href=\"/enterprise/account/home\">here</a></h2>
            </body>
        </html>`,
        headers: {
            "Cache-Control": 'private',
            "Content-Type": 'text/html; "charset=utf-8',
            "Date": 'Mon, 16 Apr 2018 21:13:28 GMT',
            "Location": '/enterprise/account/home',
            "Server": '',
            "Strict-Transport-Security": 'max-age=3600; includeSubDomains',
            "X-Powered-By": '',
            // "Set-Cookie": 'ASP.NET_SessionId=1234567890',
            // "Set-Cookie": 'Responsive=qwertyuiop',
            // "Set-Cookie": 'LegendOnlineAffinity=zxcvb',
            "Set-Cookie": 'ASP.NET_SessionId=1234567890,Responsive=qwertyuiop,LegendOnlineAffinity=zxcvb'
        },
        reqheaders: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'https://gymbox.legendonlineservices.co.uk/enterprise/account/login',
            'Cache-Control': 'no-cache',
            //Accept:text/html, application/xhtml+xml, image/jxr, */*
            //Accept-Encoding:gzip, deflate
            //Accept-Language:en-GB,en;q=0.5
            //User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko
            //Connection:Keep-Alive
            'Cookie': 'APP_LGD_COOKIE_TEST=true'
        }
    }

    export const logout: NockDefinition = {
        scope: 'https://gymbox.legendonlineservices.co.uk',
        method: 'GET',
        path: '/enterprise/Account/Logout',
        body: '',
        status: 302,
        response: `<html>
            <head>
                <title>Object moved</title>
            </head>
            <body>
                <h2>Object moved to <a href=\"/enterprise/account/login\">here</a>.</h2>
            </body>
        </html>`,
        headers: {
            "Cache-Control": 'private',
            "Content-Type": 'text/html; charset=utf-8',
            "Date": 'Mon, 16 Apr 2018 21:15:54 GMT',
            "Location": '/enterprise/account/login',
            "Server": '',
            "Strict-Transport-Security": 'max-age=3600; includeSubDomains',
            "X-Powered-By": ''
        }
    }
}