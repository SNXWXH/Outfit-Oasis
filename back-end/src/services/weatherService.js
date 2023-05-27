// weatherService.js
import axios from "axios";
import config from "@/config";

export async function getCurrentWeather(lat, lng) {
  const serviceKey = config.weather_key;

  try {
    const rs = await dfs_xy_conv("toXY", lat, lng);
    const _nx = rs.nx;
    const _ny = rs.ny;

    const today = new Date();
    today.setHours(today.getHours());

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hours = today.getHours();
    const minutes = today.getMinutes();

    if (minutes < 30) {
      hours = hours - 1;
      if (hours < 0) {
        today.setDate(today.getDate() - 1);
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        hours = 23;
      }
    }
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (dd < 10) {
      dd = "0" + dd;
    }

    const ttoday = `${yyyy}${mm}${dd}`;
    const basetime = `${hours}00`;
    const apiUrl =
      "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    const queryParams = `?ServiceKey=${serviceKey}&base_date=${ttoday}&base_time=${basetime}&nx=${_nx}&ny=${_ny}&pageNo=1&numOfRows=10&dataType=JSON`;

    const path = apiUrl + queryParams;

    const response = await axios.get(path);
    const ret = response.data;
    // const weatherData = makeResponse(ret);

    return ret;
  } catch (error) {
    console.log("Error:", error.message);
    throw new Error("Failed to fetch weather data");
  }
}

function makeResponse(ret) {
  let pty, reh, rn1, t1h, uuu, vec, vvv, wsd;
  ret.response.body.items.item.forEach(function (it) {
    if (it.category === "PTY") pty = it.obsrValue;
    else if (it.category === "REH") reh = it.obsrValue;
    else if (it.category === "RN1") rn1 = it.obsrValue;
    else if (it.category === "T1H") t1h = it.obsrValue;
    else if (it.category === "UUU") uuu = it.obsrValue;
    else if (it.category === "VEC") vec = it.obsrValue;
    else if (it.category === "VVV") vvv = it.obsrValue;
    else if (it.category === "WSD") wsd = it.obsrValue;
  });

  if (pty === 0) {
    pty = "sun";
  } else if (pty === 1) {
    pty = "rain";
  } else if (pty === 2) {
    pty = "rain/snow";
  } else if (pty === 3) {
    pty = "snow";
  } else if (pty === 4) {
    pty = "rain";
  }

  return { temp: t1h, wind: wsd, pty: pty };
}

// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//
function dfs_xy_conv(code, v1, v2) {
  var RE = 6371.00877; // 지구 반경(km)
  var GRID = 5.0; // 격자 간격(km)
  var SLAT1 = 30.0; // 투영 위도1(degree)
  var SLAT2 = 60.0; // 투영 위도2(degree)
  var OLON = 126.0; // 기준점 경도(degree)
  var OLAT = 38.0; // 기준점 위도(degree)
  var XO = 43; // 기준점 X좌표(GRID)
  var YO = 136; // 기1준점 Y좌표(GRID)

  var DEGRAD = Math.PI / 180.0;
  var RADDEG = 180.0 / Math.PI;

  var re = RE / GRID;
  var slat1 = SLAT1 * DEGRAD;
  var slat2 = SLAT2 * DEGRAD;
  var olon = OLON * DEGRAD;
  var olat = OLAT * DEGRAD;

  var sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);
  var rs = {};
  if (code == "toXY") {
    rs["lat"] = v1;
    rs["lng"] = v2;
    var ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    var theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs["nx"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs["ny"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs["nx"] = v1;
    rs["ny"] = v2;
    var xn = v1 - XO;
    var yn = ro - v2 + YO;
    ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) -ra;
    var alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) -theta;
      } else theta = Math.atan2(xn, yn);
    }
    var alon = theta / sn + olon;
    rs["lat"] = alat * RADDEG;
    rs["lng"] = alon * RADDEG;
  }
  return rs;
}
