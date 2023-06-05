import axios from "axios";
import config from "@/config";

export default async function air(lat, lon) {
  const apiKey = config.air_key;
  try {
    const path = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(path);
    const data = response.data.list[0].components.pm10;
    return data;
  } catch (err) {
    console.log(err);
  }
}
