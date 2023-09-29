module.exports.posts=function(req,res){
    return res.end('<h1>Posts will come up here</h1>')
}
const Post=require('../models/post');

module.exports.create = async function(req, res) {
    try {
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id
      });
      
      // Assuming Post.create returns the created post
      
      return res.redirect('back');
    } catch (err) {
      console.log("Error in creating a Post", err);
      // Handle the error here if needed
      return res.redirect('back'); // You may want to handle the error differently
    }
  }
  