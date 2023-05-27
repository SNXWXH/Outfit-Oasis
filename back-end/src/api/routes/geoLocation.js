import geoLocation from "@/services/locationService";

export default (router) => {
  router.get("/location", async (req, res) => {
    const result = await geoLocation();
    res.json(result);
  });
};
