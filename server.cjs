// server.cjs
const fs = require("fs");
const https = require("https");
const url = require("url");
const {
  loginHeader,
  loginRes,
  pfHeader,
  pfRes,
  meRes,
  meProductRes,
  productRes,
  sppRes,
  appLoginRes,
  userIdRes,
  versionRes,
} = require("./data/res.cjs");

function handleRequest(req, res) {
  const { pathname, query } = url.parse(req.url, true);
  console.log(`${req.method} ${req.url} ${req.da}`);

  if (pathname === "/api/v1/auth/login" && req.method === "POST") {
    res.writeHead(201, loginHeader);
    return res.end(JSON.stringify(loginRes));
  }

  if (pathname === "/api/v1/auth/profile" && req.method === "GET") {
    res.writeHead(200, pfHeader);
    return res.end(JSON.stringify(pfRes));
  }

  if (pathname === "/api/v1/app/products" && req.method === "GET") {
    res.writeHead(200, pfHeader);
    return res.end(JSON.stringify(productRes));
  }
  if (pathname === "/api/v1/employees/support" && req.method === "GET") {
    res.writeHead(200, pfHeader);
    return res.end(JSON.stringify(sppRes));
  }
  if (pathname === "/api/v1/customers/me" && req.method === "GET") {
    res.writeHead(200, pfHeader);
    if (query.includes === "planSubscriptions.product") {
      return res.end(JSON.stringify(meProductRes));
    }
    return res.end(JSON.stringify(meRes));
  }

  //app
  if (pathname === "/api/v1/auth/tool/login" && req.method === "POST") {
    res.writeHead(201, loginHeader);
    return res.end(JSON.stringify(appLoginRes));
  }

  if (pathname === "/api/v1/auth/tool/userId" && req.method === "POST") {
    res.writeHead(201, pfHeader);
    return res.end(JSON.stringify(userIdRes));
  }
  if (pathname === "/api/v1/auth/tool/verify-version" && req.method === "POST") {
    res.writeHead(201, pfHeader);
    return res.end(JSON.stringify(versionRes));
  }
  if (pathname === "/api/v1/auth/tool/2fa" && req.method === "POST") {
    res.writeHead(201, pfHeader);
    console.log(req)
    return res.end(JSON.stringify({}));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

https
  .createServer(
    {
      key: fs.readFileSync("./certs/apikey.phanmemmkt.vn-key.pem"),
      cert: fs.readFileSync("./certs/apikey.phanmemmkt.vn.pem"),
    },
    handleRequest
  )
  .listen(443, "127.0.0.5", () => {
    console.log("Fake API over TLS → https://apikey.phanmemmkt.vn/");
  });
