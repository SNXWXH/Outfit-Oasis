import geoLocation from "@/services/locationService";
import { getCurrentWeather } from "@/services/weatherService";

export default (router) => {
  router.get("/weather", async (req, res) => {
    try {
      const location = await geoLocation();

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
