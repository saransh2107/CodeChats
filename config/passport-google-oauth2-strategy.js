const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for gooogle log-in
passport.use(new googleStrategy({
    clientID:'1052417957894-hl9lfebfanhvjcfmlit178j4lpubq9ol.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
},async function(accessToken,refrsehToken,profile,done){
    try{
        //find user
        let user= await User.findOne({email:profile.emails[0].value});
        console.log(profile);
        if(user){
            //if find,set user as req.user
            return done(null,user)
        }else{
            //if not found then try to create new user and set as req.user
            try{
                let newUser=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                });
                if(newUser){
                    return done(null,newUser);
                }
            }catch(err){
                console.log(err,'error in sign up');
            }
        }
    }catch(err){
        console.log(err,'Google sign in not working');
    }
    
}));
module.exports=passport;