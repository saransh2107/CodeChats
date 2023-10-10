const Comment=require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.comment,
        post: req.body.post,
        user: req.user._id
      });

      post.comments.push(comment);
      await post.save();

      res.redirect('/');
    }
  } catch (err) {
    // Handle any errors here
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
}

module.exports.destroy=async(req,res)=>{
  try{
    let comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).send("Post not found");
    }
    if(comment.user==req.user.id){

      let postId=comment.post;
      comment.deleteOne();
      Post.findByIdAndUpdate(postId,{$pull:{comment:req.params.id}})
      return res.redirect('back');
    }
  }
  catch(err){
    console.log(err);
    return res.redirect('back');
  }
}       