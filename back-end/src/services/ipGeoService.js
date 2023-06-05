import config from "@/config";
import axios from "axios";

export default async function ipgeo() {
  const apiKey = config.ipgeo_key;
  try {
    const path = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`;
    const response = await axios.get(path);
    const ip = response.data.ip;
    return ip;
  } catch (err) {
    console.log(err);
  }
}
