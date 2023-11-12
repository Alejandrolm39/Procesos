const passport=require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
var GoogleOneTapStrategy = require('passport-google-one-tap').GoogleOneTapStrategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "562859105000-vnifb8vniqvuto9gt84sfmo9g58nno8q.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://arqbase-gh-co5nc3waja-ew.a.run.app/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new GitHubStrategy({
    clientID: "4277beaccce867b9691a",
    clientSecret: "9c82f05b001b7b39f1b3006d87035d07276ab72e",
    callbackURL: "https://arqbase-gh-co5nc3waja-ew.a.run.app/github/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.use(new GoogleOneTapStrategy({
    clientID: "562859105000-j1ej97neoqcqomu2a0iltcf203majt7j.apps.googleusercontent.com",
    clientSecret: "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",
    verifyCsrfToken:false
    },

    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));