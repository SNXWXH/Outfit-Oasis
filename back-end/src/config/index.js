import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("Couldn't find src/.env");
}
export default {
  naver_access_key: process.env.NAVER_ACCESS_KEY,
  naver_secret_key: process.env.NAVER_SECRET_KEY,
  port: process.env.PORT,
};
