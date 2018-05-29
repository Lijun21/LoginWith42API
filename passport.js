const passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;
const mongoose = require('mongoose');
require('./User');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done (null, user.id);
  });
  
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done (null, user);
    });
});

passport.use(new FortyTwoStrategy({
        clientID: 'af7fbb5191bd04305b5b919b3bfaa04ac533baad5a4ae73a2a888666b6348e79',
        clientSecret: '76870b2722520c129e2fdf2479d141a7eb15e9648b2289a2cddc7bc0244a191f',
        callbackURL: "http://localhost:8000/auth/42/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const existingUser = await User.findOne({studentID: profile.id});
        if (existingUser){
            return done(null, existingUser);
        }
        const user = await new User({ studentID: profile.id }).save();
        done(null, user);
    }
));