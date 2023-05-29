import express from "express";
import location from "./routes/geolocation";
import weather from "./routes/weather";
import preWeather from "./routes/preWeather";
import chat from "./routes/chatGPT";

export default () => {
  const router = express.Router();

  location(router);
  weather(router);
  preWeather(router);
  chat(router);
  // console.log("router");
  // console.log(router.get("/", (req, res) => res.send("hi")));

  return router;
};
