import geoLocation from "@/services/locationService";
import air from "@/services/airPollutionService";
import ipGeo from "@/services/ipGeoService";

export default (router) => {
  router.get("/air", async (req, res) => {
    try {
      const ip = await ipGeo();
      const location = await geoLocation(ip);
      const lat = Number(location.geoLocation.lat);
      const lon = Number(location.geoLocation.long);

      const data = await air(lat, lon);
      res.json(data);
    } catch (error) {
      console.log("/air Error:", error.message);
    }
  });
};
