import express from "express";
import location from "./routes/geolocation";

export default () => {
  const router = express.Router();

  location(router);
  // console.log("router");
  // console.log(router.get("/", (req, res) => res.send("hi")));

  return router;
};
