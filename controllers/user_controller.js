const User = require('../models/user')

module.exports.profile=function(req,res){
    User.findById(req.params.id)
    .then(function(user){
        return res.render('user_profile',{
            title:'User',
            profile_user:user
        });
    })
    .catch(function(err){
        return;
    })
}
module.exports.update = async function (req, res) {
  if(req.user.id==req.params.id){


    try{
        let user= await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Multer Error",err);
            }
            user.name=req.body.name;
            user.email=req.body.email;
            console.log(req.body.name);
            if(req.file){
                console.log("HEllo")
                //this is saving the path of uploded file into the avatar field in user
                user.avatar=User.avatarPath+'/'+req.file.filename;
            }
            user.save();
            return res.redirect('back');
        })


    }
    catch(err){
        req.flash('Error',err);
        return res.redirect('back');

    }

  }
  else{
    req.flash('Error in updating',err);
    return res.status(401).send('Unauthorized');
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
    req.flash('success','Logged in Successfully')
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



