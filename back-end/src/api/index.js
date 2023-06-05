import express from "express";
import location from "./routes/geolocation";
import weather from "./routes/weather";
import preWeather from "./routes/preWeather";
import chat from "./routes/chatGPT";
import ip from "./routes/ipGeo";

export default () => {
  const router = express.Router();

  location(router);
  weather(router);
  preWeather(router);
  chat(router);
  ip(router);
  // console.log("router");
  // console.log(router.get("/", (req, res) => res.send("hi")));

  return router;
};
