const passport = require("passport");

const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function(app) {
    app.get("/", requireAuth, function(req, res, next) {
        res.send(["diana prince", "clark kent", "bruce wayne"]);
    });
    app.post("/signup", Authentication.signup);
};
