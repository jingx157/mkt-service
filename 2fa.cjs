function fetch2FAToken(secret) {
  return new Promise((resolve, reject) => {
    const tryUrls = [
      `https://2fa.live/tok/${encodeURIComponent(secret)}`,
      `https://2fa.live/tok?secret=${encodeURIComponent(secret)}`,
    ];

    const tryOne = (i) => {
      if (i >= tryUrls.length)
        return reject(new Error("All 2fa.live URL attempts failed"));
      const url = tryUrls[i];

      https
        .get(
          url,
          {
            headers: {
              accept: "application/json",
              "user-agent": "node",
            },
          },
          (r) => {
            let body = "";
            r.on("data", (c) => (body += c));
            r.on("end", () => {
              if (r.statusCode && r.statusCode >= 200 && r.statusCode < 300) {
                try {
                  resolve(JSON.parse(body));
                } catch {
                  resolve({ raw: body });
                } // if 2fa.live returns text
              } else {
                // try next style
                tryOne(i + 1);
              }
            });
          }
        )
        .on("error", (e) => {
          // try next style on network error
          tryOne(i + 1);
        });
    };

    tryOne(0);
  });
}

module.exports = { fetch2FAToken };
