import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("Couldn't find src/.env");
}
export default {
  naver_access_key: process.env.NAVER_ACCESS_KEY,
  naver_secret_key: process.env.NAVER_SECRET_KEY,
  weather_key: process.env.WEATHER_KEY,
  ai_key: process.env.OPENAI_API_KEY,
  port: process.env.PORT,
  ipgeo_key: process.env.IPGEO_KEY,
};
