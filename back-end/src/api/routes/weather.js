import geoLocation from "@/services/locationService";
import { getCurrentWeather } from "@/services/weatherService";
import ipGeo from "@/services/ipGeoService";

export default (router) => {
  router.get("/weather", async (req, res) => {
    try {
      const ip = await ipGeo();
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
