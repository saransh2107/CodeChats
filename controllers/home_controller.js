//Creating the controller for the /
const Post=require('../models/post');
module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({}).populate('user').exec();
        return res.render('home', {
            title: "Code Chats",
            posts: posts
        });
    } catch (err) {
        console.error(err);
        // Handle the error and send an appropriate response
        return res.status(500).send('Internal Server Error');
    }
};







