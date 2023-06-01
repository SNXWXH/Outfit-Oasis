import geoLocation from "@/services/locationService";
import axios from "axios";

export default (router) => {
  router.get("/location", async (req, res) => {
    await axios
      .get(
        "https://api.ipgeolocation.io/ipgeo?apiKey=cd1632b2c9b24f949db4be57973979b1"
      )
      .then(async (response) => {
        const ip = response.data.ip;
        // console.log(response.data);
        const result = await geoLocation(ip);
        res.json(result);
      })
      .catch((error) => {
        console.log("hi", error);
      });
  });
};
