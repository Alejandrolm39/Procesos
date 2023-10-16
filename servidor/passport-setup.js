const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "562859105000-aida40ck4gkpjcscjqk6ft62usrjfa9d.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));