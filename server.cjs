const http = require("http");
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
} = require("./data/res.cjs");

function handleRequest(req, res) {
  const { pathname, query } = url.parse(req.url, true);

  console.log(`${req.method} ${req.url}`);

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
    if (query.includes && query.includes === "planSubscriptions.product") {
      return res.end(JSON.stringify(meProductRes));
    }
    return res.end(JSON.stringify(meRes));
  }

  // default fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
}

http.createServer(handleRequest).listen(3000, "0.0.0.0", () => {
  console.log("Fake login server listening on http://127.0.0.1:3000");
});
