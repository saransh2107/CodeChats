const passport=require('passport');
const User=require('../models/user');
const LocalStrategy=require('passport-local').Strategy;


//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            console.log('Invalid username/password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user---->Passport');
        return done(err);
    }
}));


//serializing the user to decide which key is to kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//deserilaizing the user from the key in cookies
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            console.log('User not found');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in finding user---->Passport');
        return done(err);
    }
});

//check if the user is authenticated

passport.checkAuthentication=function(req,res,next){
    //if the user is signed in,then pass on the request to next function
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated){
        //req.user contains the current signed in user from session cookie
        res.locals.user=req.user;

    }
    next();
}

module.exports=passport