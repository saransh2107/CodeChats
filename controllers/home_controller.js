//Creating the controller for the /
const Post=require('../models/post');
const User=require('../models/user');
module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })
        
        .exec();
       let users=await User.find({});
        return res.render('home', {
            title: "Code Chats",
            posts: posts,
            all_users:users
        });
    } catch (err) {
        console.error(err);
        // Handle the error and send an appropriate response
        return res.status(500).send('Internal Server Error');
    }
};







