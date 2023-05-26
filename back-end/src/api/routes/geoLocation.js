import config from "@/config";
import CryptoJS from "crypto-js";
import axios from "axios";

export default (router) => {
  router.get("/location", async (req, res) => {
    const access_key = config.naver_access_key; //발급받은 api Key 입력
    const secret_key = config.naver_secret_key; //발급받은 Secret_key 입력

    const requestMethod = "GET";
    const hostName = "https://geolocation.apigw.ntruss.com";
    const requestUrl = "/geolocation/v2/geoLocation";
    const list = {
      a: "aaaa",
    };
    const timeStamp = Math.floor(+new Date()).toString();

    async function map() {
      const sortedSet = {};
      sortedSet["ip"] = "115.161.95.253"; //예시ip
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
      // console.log(list);
      let a = await axios.get(`${hostName}${baseString}`, config); //내가 밖으로 내보내고 싶은값
      list.b = a.data;
      console.log(list.b);
      // return a;
    }

    await map();
    console.log(list);

    // console.log("asdkjlasdlasd", list);

    function makeSignature(
      secretKey,
      method,
      baseString,
      timestamp,
      accessKey
    ) {
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
    res.json(list.b);
  });
};
