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
const { getTotpCode } = require("./2fa.cjs");

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        // ~1MB guard
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

async function handleRequest(req, res) {
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
  if (
    pathname === "/api/v1/auth/tool/verify-version" &&
    req.method === "POST"
  ) {
    console.log(versionRes);
    return res.end(JSON.stringify(versionRes));
  }
  if (pathname === "/api/v1/auth/tool/2fa" && req.method === "POST") {
    try {
      const body = await readJsonBody(req);
      const secret = body.key;
      const code = await getTotpCode(secret);
      console.log(code);
      res.writeHead(201, pfHeader);
      return res.end(JSON.stringify({ code }));
    } catch (err) {
      res.writeHead(502, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error: "Failed to fetch from 2fa.live",
          detail: err.message,
        })
      );
    }
  }

  if (pathname === "/api/v1/chromes/profile" && req.method === "POST") {
    return readJsonBody(req)
      .then((body = {}) => {
        const profileName = body.profileName || "61580146070495-win";
        const uuid = (body.profileId || "61580146070495").split("-")[0];

        const configHex = buildConfigMktHex({
          uuid,
          profileName,
          // tweak these if you like:
          fonts: [
            "Roboto",
            "Arial",
            "Courier",
            "Courier New",
            "Georgia",
            "Times New Roman",
            "Verdana",
          ],
          localIp: "192.168.1.67",
        });

        const payload = {
          "config.mkt": configHex, // <-- hex-encoded plaintext
          "network.mkt": buildNetworkMkt({}), // <-- plain text with \n line breaks
          command: {
            "--no-sandbox": "",
            "--no-first-run": "",
            "--metrics-recording-only": "",
            "--no-default-browser-check": "",
            "--disable-features":
              "FlashDeprecationWarning,EnablePasswordsAccountStorage,CalculateNativeWinOcclusion,OptimizationHints,AcceleratedVideoDecode,ChromeLabs,ReadLater,ChromeWhatsNewUI,TrackingProtection3pcd",
            "--disable-crash-reporter": "",
            "--disable-background-timer-throttling": "",
            "--disable-backgrounding-occluded-windows": "",
            "--disable-renderer-backgrounding": "",
            "--hide-crash-restore-bubble": "",
            "--disable-background-mode": "",
            "--disable-timer-throttling": "",
            "--disable-render-backgrounding": "",
            "--disable-background-media-suspend": "",
            "--disable-external-intent-requests": "",
            "--disable-ipc-flooding-protection": "",
            "--enable-unsafe-webgpu": "",
            "--lang": body.language || "vi",
          },
          commandCustom: "",
          isForwardProxy: true,
        };

        res.writeHead(201, pfHeader || { "Content-Type": "application/json" });
        return res.end(JSON.stringify(payload));
      })
      .catch((err) => {
        console.error("profile handler error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "internal" }));
      });
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
