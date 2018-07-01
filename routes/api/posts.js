const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');
const User = require('../../models/User');

const validatePostInput = require('../../validation/post');
const validateCommentInput = require('../../validation/comment');

// @route  api/posts
// @desc   fetch all posts
// @access public
router.get('/', (req, res) =>
  Post.find({})
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(500).json(err))
);

// @route  api/posts
// @desc   creates post
// @access private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {
      user,
      body: { name, text, avatar }
    } = req;

    const newPost = new Post({
      name,
      text,
      avatar,
      user: user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(500).json(err));
  }
);

// @route  api/posts/:id
// @desc   fetch single post
// @access public
router.get('/:id', (req, res) =>
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ post: 'There is no post with this id' })
    )
);

// @route  api/posts/:id
// @desc   delete post
// @access private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() === req.user.id) {
          post.remove().then(() => res.json({ success: true }));
        }
      })
      .catch(err => res.status(500).json(err));
  }
);

// @route api/posts/:id/like
// @desc likes the post
// @access private
router.post(
  '/:id/like',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.find(like => like.user.toString() === req.user.id)) {
          return res.status(400).json({ error: 'Post is already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(500).json({ error: 'There is no post with this id' })
      );
  }
);

// @route api/posts/:id/unlike
// @desc unlikes the post
// @access private
router.post(
  '/:id/unlike',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (!post.likes.find(like => like.user.toString() === req.user.id)) {
          return res.status(400).json({ error: `Post isn't liked yet` });
        }

        post.likes = post.likes.filter(l => l.user.toString() !== req.user.id);

        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ error: 'There is no post with this id' })
      );
  }
);

// @route api/posts/:id/comments
// @desc add a comment to the post
// @access private
router.post(
  '/:id/comments',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body;

    Post.findById(req.params.id)
      .then(post => {
        const comment = {
          text,
          name,
          avatar,
          user: req.user.id
        };

        post.comments.unshift(comment);

        post.save().then(p => res.json(p));
      })
      .catch(err => res.status(404).json({ error: 'The post is not found' }));
  }
);

// @route api/posts/:postId/comments/:commentId
// @desc delete the comment from the post
// @access private
router.delete(
  '/:postId/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { postId, commentId } = req.params;

    Post.findById(postId)
      .then(post => {
        if (!post.comments.find(c => c.id.toString() === commentId)) {
          res.status(404).json({ error: 'There is no comment with this id' });
        }

        post.comments = post.comments.filter(
          c => c.id.toString() !== commentId
        );

        post.save().then(p => res.json(p));
      })
      .catch(err => res.status(404).json({ error: 'The post is not found' }));
  }
);

module.exports = router;
