import geoLocation from "@/services/locationService";
import { getCurrentWeather } from "@/services/preWeatherService";
import ipGeo from "@/services/ipGeoService";

export default (router) => {
  router.get("/preweather", async (req, res) => {
    try {
      const ip = await ipGeo();

      const location = await geoLocation(ip);

      const lat = Number(location.geoLocation.lat);
      const lng = Number(location.geoLocation.long);

      const PreweatherData = await getCurrentWeather(lat, lng);
      res.json(PreweatherData);
    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });
};
