import geoLocation from "@/services/locationService";
import ipGeo from "@/services/ipGeoService";

export default (router) => {
  router.get("/location", async (req, res) => {
    const ip = await ipGeo();

    const result = await geoLocation(ip);
    res.json(result);
  });
};
