const express = require("express");
const router = express.Router();
const {
  // fetchPost,
  authorsGet,
  authorCreate,
  // postsDelete,
  postsCreate,
} = require("./authors.controllers");

router.get("/", authorsGet);
router.post("/", authorCreate);
router.post("/:authorId", postsCreate);
module.exports = router;
