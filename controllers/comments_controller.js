const Comment=require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async (req, res) => {
  console.log(req.body.content);
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