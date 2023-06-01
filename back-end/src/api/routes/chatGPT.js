import { communicateWithChatGPT } from "@/services/chatGPTService";
import { getCurrentWeather } from "@/services/preWeatherService";
import geoLocation from "@/services/locationService";
import axios from "axios";

export default (router) => {
  router.get("/chat", async (req, res) => {
    let ip;
    try {
      await axios
        .get(
          "https://api.ipgeolocation.io/ipgeo?apiKey=cd1632b2c9b24f949db4be57973979b1"
        )
        .then(async (response) => {
          ip = response.data.ip;
        })
        .catch((error) => {
          console.log("hi", error);
        });
      const location = await geoLocation(ip);
      const lat = Number(location.geoLocation.lat);
      const lng = Number(location.geoLocation.long);

      const PreweatherData = await getCurrentWeather(lat, lng);

      const sky = PreweatherData.response.body.items.item[0].fcstValue;
      const rn1 = PreweatherData.response.body.items.item[4].fcstValue;
      const temp = PreweatherData.response.body.items.item[10].fcstValue;

      const message = `하늘 상태는 ${sky}. 1시간 강수량은 ${rn1}이다. 온도는 ${temp}이다. 이런 날씨의 옷 추천해줘`;

      const responses = await communicateWithChatGPT(message);
      // console.log(responses);
      res.json(responses);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
