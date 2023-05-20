import express from "express";
const router = express.Router();
console.log("router");
console.log(router.get("/", (req, res) => res.send("hi")));
router.get("/dd", (req, res) => {
  res.send("hello");
});
export default router;
