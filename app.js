const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const authorsRoutes = require("./api/authors/authors.routes");
const connectDb = require("./database");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");

connectDb();

app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/authors", authorsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
