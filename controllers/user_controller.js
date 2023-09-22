const User = require('../models/user')

module.exports.profile = async function (req, res) {
    try {
        if (req.cookies.user_id) {
            const user = await User.findById(req.cookies.user_id).exec();
            if (user) {
                return res.render('user_profile', { title: "User Profile", user: user });
            }
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('/users/sign-in');
        }
    } catch (err) {
        // Handle any errors that might occur during the async operations
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};
//render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }


    return res.render('user_sign_up', {
        title: "Code Chats | Sign Up"
    })
}
//render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_in', {
        title: "Code Chats | Sign In"
    })
}
//get the sign up data and create the user
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (!existingUser) {
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in signing up:', err);
        return res.status(500).send('Internal Server Error'); // Handle the error as needed
    }
};

module.exports.createSession = function (req, res) {
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){

    req.logout(function(err){
        if(err){
            console.log("Error in logout");
        }
        // req.flash('success','logged out');
        
    });
    return res.redirect('/')
}



