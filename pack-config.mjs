// --- helpers ---
const b64 = (s) => Buffer.from(s, "utf8").toString("base64");
const hexEncode = (s) => Buffer.from(s, "utf8").toString("hex").toUpperCase();

function buildConfigMktHex({
  uuid,
  profileName,
  fonts = [
    "Roboto",
    "Arial",
    "Courier",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
  ],
  localIp = "192.168.1.67",
}) {
  const lines = [
    `uuid:${uuid}`,
    `hidemium.name_profile:${profileName}`,
    `hidemium.url_blocked:def`,
    `hidemium.timezone:def`,
    `hidemium.referer:def`,
    `hidemium.port_protect:3389,5900,5800,7070,6568`,
    `hidemium.disable_image:def`,
    `hidemium.ip_public:def`,
    `fonts:${fonts.join(",")}`,
    `webgl.vendor:Google Inc.`,
    `webgl.renderer:ANGLE (OpenGL ES 3.0 ...)`,
    // keep some base64-ish values like the real payload
    `mkt.header.value:${b64("Accept-Language|vi,en-US;q=0.9,en;q=0.8|*|1")}`,
    `webrtc.local_ip:${b64(localIp)}`,
  ];
  return hexEncode(lines.join("\n"));
}

function buildNetworkMkt({ localIp = "192.168.1.67" } = {}) {
  return [
    `machine.ip_public:default`,
    `webrtc.public_ip:default`,
    `webrtc.local_ip:${b64(localIp)}`,
    `webrtc.ipv6:default`,
    `mkt.geolocation.latitude:default`,
    `mkt.geolocation.longitude:default`,
    `mkt.geolocation.accuracy:100`,
    `mkt.timezone:default`,
    `mkt.webrtc.mode:real`,
    `mkt.header.mode:noise`,
    `mkt.header.value:${b64("Accept-Language|vi,en-US;q=0.9,en;q=0.8|*|1")}`,
    `mkt.languages:vi-VN,vi,en-US,en`,
    `hidemium.languages:vi,en-US,en`,
  ].join("\n");
}

modules.exports = {
  buildConfigMktHex,
  buildNetworkMkt,
};
