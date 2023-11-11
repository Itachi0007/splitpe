const passport = require("passport")
const config = require("../config/config");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const profileModel = require("../models/profile_model").profileModel;

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientId,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken , profile) ;
    profileModel.findOne({ googleId: profile.id },(err, profile) => {
        if(err) return cb(err,null);
        if(!profile) {
            let newProfile = new profileModel({
                googleId : profile.id ,
                name : profile.displayName
            })
            newProfile.save();
            return cb(null,newProfile);
        }
        else {
            return cb(null,profile)
        }
    });
  }
));

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    profileModel.findById(id,(err,user)=>{
        done(err,user);
    })
})