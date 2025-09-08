// totp.js
const speakeasy = require("speakeasy");
async function getTotpCode(base32Secret) {
  return speakeasy.totp({
    secret: base32Secret,
    encoding: "base32",
  });
}

module.exports = { getTotpCode };
