const expressJwt = require("express-jwt");

function jwt() {
  const secret = "testing";
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  });
}

module.exports = jwt;
