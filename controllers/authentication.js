const User = require("../models/user");

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(422).send({ error: "You must provide email and password." });
    }

    // See if the user with the given email exists
    User.findOne({ email: email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // If the user with email exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: "Email is in use" });
        }

        // If the user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            if (err) {
                return next(err);
            }

            // Respond to request indicating the user was created
            res.json(user);
        });
    });
};
