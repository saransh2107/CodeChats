module.exports.posts=function(req,res){
    return res.end('<h1>Posts will come up here</h1>')
}
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create = async function(req, res) {
    try {
      let post = await Post.create({
        content: req.body.content,
        user: req.user._id
      });
      if(req.xhr){
        return res.status(200).json({
          data:{
            post:post
          },
          message:"Post Created"
        });
      }
      
      // Assuming Post.create returns the created post
      req.flash('success','Post Published!');
      return res.redirect('back');
    } catch (err) {
      console.log("Error in creating a Post", err);
      // Handle the error here if needed
      req.flash('error','Error in Creating Post') 
      return res.redirect('back'); // You may want to handle the error differently
    }
  }
  module.exports.destroy = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).send("Post not found");
      }
  
      if (post.user == req.user.id) {
        await Post.deleteOne({ _id: req.params.id });
        await Comment.deleteMany({ post: req.params.id });

        if(req.xhr){
          return res.status(200).json({
            data:{
              post_id:req.params.id
            },
            message:"Post Deleted"
          });
        }





        req.flash('success','Post Destroyed!')
        return res.redirect('back');
      } else {
        return res.status(403).send("You don't have permission to delete this post");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
  };
  