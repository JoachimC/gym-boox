import {NockDefinition} from "nock";

export namespace Basket {
    export const addClassToBasket: NockDefinition = {
        scope: 'https://gymbox.legendonlineservices.co.uk',
        method: 'GET',
        path: '/enterprise/BookingsCentre/AddBooking?booking=1060498',
        status: 200,
        response: `{
            "Success": true,
            "AllowRetry": false,
            "Message": "Booking added to basket",
            "StartTime": "/Date(1523980800000)/",
            "EndTime": "/Date(1523982600000)/",
            "FacilityName": "Farringdon",
            "ActivityName": "BadAss",
            "ResourceLocation": null
        }`,
        headers: {
            'Cache-Control': 'private',
            'Connection': 'close',
            'Content-Type': 'text/html; charset=utf-8',
            'Date': 'Mon, 16 Apr 2018 21:13:28 GMT',
            'Server': '',
            'Strict-Transport-Security': 'max-age=3600; includeSubDomains',
            'X-Powered-By': ''
        },
        // reqheaders: {
        //     'Cookie': 'ASP.NET_SessionId=1234567890;Responsive=qwertyuiop;LegendOnlineAffinity=zxcvb;APP_LGD_COOKIE_TEST=true'
        // }
    }

    export const pay: NockDefinition = {
        scope: 'https://gymbox.legendonlineservices.co.uk',
        method: 'GET',
        path: '/enterprise/Basket/Pay',
        status: 302,
        response: `|<html>
            <head>
                <title>Object moved</title>
            </head>
            <body>
                <h2>Object moved to 
                    <a href="/enterprise/basket/paymentconfirmed">here</a>.
                </h2>
            </body>
        </html>`,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/html; charset=utf-8',
            'Date': 'Mon, 16 Apr 2018 21:13:28 GMT',
            'Expires': '-1',
            'Location': '/enterprise/basket/paymentconfirmed',
            'Pragma': 'no-cache',
            'Server': '',
            'Strict-Transport-Security': 'max-age=3600; includeSubDomains',
            'X-Powered-By': ''
        },
        // reqheaders: {
        //     'Cookie': 'ASP.NET_SessionId=1234567890;Responsive=qwertyuiop;LegendOnlineAffinity=zxcvb;APP_LGD_COOKIE_TEST=true'
        // }
    }
}