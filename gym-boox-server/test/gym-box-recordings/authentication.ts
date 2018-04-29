type Recording = {
    scope: string,
    method: string,
    path: string,
    body?: string,
    status: number,
    response?: string,
    headers?: any,
    reqHeaders?: any
};

const login: Recording = {
    scope: "https://gymbox.legendonlineservices.co.uk",
    method: "POST",
    path: "/enterprise/account/login",
    body: "login.Email=<email>&login.Password=<password>",
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
        "Content-Length": 141,
        "Content-Type": 'text/html; "charset=utf-8',
        "Date": 'Mon, 16 Apr 2018 21:13:28 GMT',
        "Location": '/enterprise/account/home',
        "Server": null,
        "Strict-Transport-Security": 'max-age=3600; includeSubDomains',
        "X-Powered-By": null
    },
    reqHeaders: {
        "Content-Type": 'application/x-www-form-urlencoded',
        //Referer:https://gymbox.legendonlineservices.co.uk/enterprise/account/login
        //Cache-Control:no-cache
        //Accept:text/html, application/xhtml+xml, image/jxr, */*
        //Accept-Encoding:gzip, deflate
        //Accept-Language:en-GB,en;q=0.5
        //User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko
        //Connection:Keep-Alive
        "Cookie": 'APP_LGD_COOKIE_TEST=true'
    }
}

const logout: Recording = {
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
        "Content-Length": 142,
        "Content-Type": 'text/html; charset=utf-8',
        "Date": 'Mon, 16 Apr 2018 21:15:54 GMT',
        "Location": '/enterprise/account/login',
        "Server": null,
        "Strict-Transport-Security": 'max-age=3600; includeSubDomains',
        "X-Powered-By": null
    },
    reqHeaders: {}
}


export {login, logout}