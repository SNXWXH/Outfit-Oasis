// router.js
import { getCurrentWeather } from "@/services/weatherService";

export default (router) => {
  router.get("/weather", async (req, res) => {
    try {
      const lat = 37;
      const lng = 127;

      const weatherData = await getCurrentWeather(lat, lng);
      console.log(weatherData);
      res.json(weatherData);
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });
};
