import express from "express";

export default () => {
  const router = express.Router();
  console.log("router");
  console.log(router.get("/", (req, res) => res.send("hi")));
  router.get("/dd", (req, res) => {
    res.send("hello");
  });
  return router;
};
