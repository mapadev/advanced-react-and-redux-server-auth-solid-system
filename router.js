const Authentication = require("./controllers/authentication");

module.exports = function(app) {
    // app.get("/", function(req, res, next) {
    //     res.send(["diana prince", "clark kent", "bruce wayne"]);
    // });
    app.post("/signup", Authentication.signup);
};
