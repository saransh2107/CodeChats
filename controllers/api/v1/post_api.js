const Post=require('../../../models/post');
const Comment=require('../../../models/comment')
module.exports.index=async function(req,res){

    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}



  module.exports.destroy = async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.json(404, { message: "Post not found" });
      }
  
      if (post.user == req.user.id) {
        await post.deleteOne(); // Use deleteOne() to delete the post
        await Comment.deleteMany({ post: req.params.id });
  
        return res.json(200, {
          message: "Post Deleted",
        });
      } else {
        return res.json(401, { message: "You can not delete the post" });
      }
    } catch (err) {
      console.log(err);
  
      return res.json(500, {
        message: "Internal Server Error",
      });
    }
  };
  