import geoLocation from "@/services/locationService";
import { getCurrentWeather } from "@/services/weatherService";
import axios from "axios";

export default (router) => {
  router.get("/weather", async (req, res) => {
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

      const weatherData = await getCurrentWeather(lat, lng);
      res.json(weatherData);
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });
};
