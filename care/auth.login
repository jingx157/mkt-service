POST https://apikey.phanmemmkt.vn/api/v1/auth/tool/login HTTP/1.1
Accept: application/json, text/plain, */*
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) MKTClient/3.0.3 Chrome/130.0.6723.118 Electron/33.2.0 Safari/537.36
t: 1756795988642
hash: 5D8AA6FD5B3642A33FD6D2E58AF82CDD1DFD9129ECF02948DD6E2D1F742A6418
license: MKT-CARE-.300F709B-762D-546C-8052-F31341048FF9.73d78991-784b-473d-b6bc-f19f0fa6c311
Content-Length: 75
Accept-Encoding: gzip, compress, deflate, br
Host: apikey.phanmemmkt.vn
Connection: close


{
    "username": "ltngcafe@gmail.com",
    "password": "1234567890",
    "version": "6.6.6"
}

HTTP/1.1 201 Created
Date: Tue, 02 Sep 2025 06:53:11 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 727
Connection: close
Server: cloudflare
Nel: {"report_to":"cf-nel","success_fraction":0.0,"max_age":604800}
X-Powered-By: Express
Access-Control-Allow-Origin: *
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9999
X-RateLimit-Reset: 173921205472
t: 1756795991066
hash: ED9C0C68C0C915249A1932CD87D8AFA22ECD02EBAD4BE08C7AF0B114F332382E
ETag: W/"2d7-cSeXulnIVs7+zxTwZzjM+BNWHLo"
cf-cache-status: DYNAMIC
Report-To: {"group":"cf-nel","max_age":604800,"endpoints":[{"url":"https://a.nel.cloudflare.com/report/v4?s=HARzPPefBruiKhUdUaudWNCMqHjcky1QX%2F%2BqpANN8PRaup9BMj6lWAVU4aMpv8r8py7D5ngxGclMaJUXWdTOB7EQb8PH333SC7tlDLdr710RiBTC"}]}
CF-RAY: 978b16beaa98ef6d-SIN
alt-svc: h3=":443"; ma=86400


{
    "accessToken": {
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGU0MjRkMS05YTM3LTRmYjgtYTFkNi05Y2IzMjZlN2FkMmMiLCJlbWFpbCI6Imx0bmdjYWZlQGdtYWlsLmNvbSIsImlhdCI6MTc1Njc5NTk5MSwiZXhwIjoyMzU2Nzk1OTkxfQ.DrK2w6ohxu0t78iEHNYQSEp9JQZJ_YN0L1vnweiy3pU",
        "expiresIn": 600000000,
        "type": "Bearer"
    },
    "refreshToken": {
        "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGU0MjRkMS05YTM3LTRmYjgtYTFkNi05Y2IzMjZlN2FkMmMiLCJlbWFpbCI6Imx0bmdjYWZlQGdtYWlsLmNvbSIsImlhdCI6MTc1Njc5NTk5MSwiZXhwIjo0NjM2Nzk1OTkxfQ.DxBhDQwKGigQVFcLIb0aMoKAjHLCyLNvASTvE3sZm6U",
        "expiresIn": 2880000000,
        "type": "Bearer"
    },
    "userId": "5de424d1-9a37-4fb8-a1d6-9cb326e7ad2c",
    "his": "300F709B-762D-546C-8052-F31341048FF9",
    "remainingDay": 11111,
    "isVinhVien": true
}