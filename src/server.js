import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import {
  badRequestHandler,
  genericServerErrorHandler,
  notFoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";
import blogPostsRouter from "./api/blogPosts/index.js";
import infoRouter from "./api/info/index.js";
import mongoose from "mongoose";
import authorsRouter from "./api/authors/index.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

server.use(express.json());

server.use("/blogPosts", blogPostsRouter);
server.use("/authors", authorsRouter);
server.use("/info", infoRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericServerErrorHandler);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log("Server is up and running on port " + port);
});
