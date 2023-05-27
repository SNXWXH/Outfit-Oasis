import express from "express";
import location from "./routes/geolocation";
import weather from "./routes/weather";

export default () => {
  const router = express.Router();

  location(router);
  weather(router);
  // console.log("router");
  // console.log(router.get("/", (req, res) => res.send("hi")));

  return router;
};
