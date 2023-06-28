const Post = require("../../models/Post");
const Author = require("../../models/Author");

exports.authorsGet = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts");
    res.status(201).json(authors);

    // const authors = await Author.find({}, "-createAt -updateAt").populate(
    //   "posts"
    // );
    // res.json(authors);
  } catch (error) {
    next(error);
  }
};

exports.authorCreate = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);

    return res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    // req.body.authorId = req.author.id;
    const { authorId } = req.params;
    const newPost = await Post.create({ ...req.body, author: authorId });
    await Author.findByIdAndUpdate(
      // req.author.id
      authorId,
      {
        $push: { posts: newPost._id },
      }
    );
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
