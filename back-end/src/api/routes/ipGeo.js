import ipgeo from "@/services/ipGeoService";

export default (router) => {
  router.get("/iplocation", async (req, res) => {
    const result = await ipgeo();
    res.json(result);
  });
};
