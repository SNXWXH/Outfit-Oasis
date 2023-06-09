import config from "@/config";
import CryptoJS from "crypto-js";
import axios from "axios";

export default async function geoLocation(ip) {
  try {
    const access_key = config.naver_access_key;
    const secret_key = config.naver_secret_key;
    const requestMethod = "GET";
    const hostName = "https://geolocation.apigw.ntruss.com";
    const requestUrl = "/geolocation/v2/geoLocation";
    const list = {
      a: "aaaa",
    };
    const timeStamp = Math.floor(+new Date()).toString();

    async function map() {
      const sortedSet = {};
      sortedSet["ip"] = ip;
      sortedSet["ext"] = "t";
      sortedSet["responseFormatType"] = "json";

      let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
        return prev + curr + "=" + sortedSet[curr] + "&";
      }, "");

      queryString = queryString.substr(0, queryString.length - 1);

      const baseString = requestUrl + "?" + queryString;
      const signature = makeSignature(
        secret_key,
        requestMethod,
        baseString,
        timeStamp,
        access_key
      );

      const config = {
        headers: {
          "x-ncp-apigw-timestamp": timeStamp,
          "x-ncp-iam-access-key": access_key,
          "x-ncp-apigw-signature-v2": signature,
        },
      };

      let a = await axios.get(`${hostName}${baseString}`, config);
      list.b = a.data;
    }

    await map();
    return list.b;
  } catch (err) {
    console.log("locationService");
  }
}

//api의 시그니처 키 생성
function makeSignature(secretKey, method, baseString, timestamp, accessKey) {
  const space = " ";
  const newLine = "\n";
  let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

  hmac.update(method);
  hmac.update(space);
  hmac.update(baseString);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}
