const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const config = require("../config");

// Create local strategy
const localOptions = {
    usernameField: "email"
};
const localLogin = new LocalStrategy(localOptions, function(
    email,
    password,
    done
) {
    // Verify the email and password, call 'done' with user
    // if it is correct email and password
    // otherwise call 'done' with false
    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false);
        }

        // compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
});

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See it the userId in the payload exists in our database.
    // It it does, call "done" with that user,
    // otherwise call "done" without user object
    User.findById(payload.sub, function(err, user) {
        if (err) {
            return next(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
