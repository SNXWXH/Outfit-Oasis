<template>
  <div>
    <div class="background">
      <img src="@/assets/image/cloudy.gif" />
    </div>
    <div class="leftright">
      <div class="left-box"></div>
      <div class="search-bar">
        <input type="text" placeholder="Search" />
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
      <div class="detail">
        <v-window
          class="detail__slide"
          v-model="onboarding"
          show-arrows="hover"
        >
          <v-window-item :key="`card-${n}`">
            <v-card elevation="2" class="detail__v-card">
              <h1>Today outfit</h1>
              <div class="detail__v-card-outfit">
                <h2 v-html="outfit[0]"></h2>
                <h2 v-html="outfit[1]"></h2>
                <h2 v-html="outfit[2]"></h2>
                <h2 v-html="outfit[3]"></h2>
                <h2 v-html="outfit[4]"></h2>
              </div>
            </v-card>
          </v-window-item>
          <v-window-item :key="`card-${n}`">
            <v-card elevation="2" class="detail__v-card">
              <h1>Weather Detail</h1>
              <div class="detail__v-card-weather">
                <div class="detail__v-card-temp">
                  <h2>하늘 상태</h2>
                  <h2>{{ type }}</h2>
                </div>
                <div class="detail__v-card-humidity">
                  <h2>습도</h2>
                  <h2>{{ humi }}%</h2>
                </div>
                <div class="detail__v-card-wind">
                  <h2>풍속</h2>
                  <h2>{{ wind }}m/s</h2>
                </div>
                <div class="detail__v-card-cloud">
                  <h2>1시간 강수량</h2>
                  <h2>{{ rain }}mm</h2>
                </div>
              </div>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
      <div class="right-box">
        <div class="right-box__day">
          <h2>{{ dateFormat() }}</h2>
        </div>
        <div class="right-box__dust">
          <h2>21㎍/㎥</h2>
          <i class="fa-solid fa-circle-question"></i>
        </div>
        <div class="right-box__dust__detailBox">
          <div class="right-box__dust__detailText">
            <div class="right-box__dust__detailText1">
              <i class="fa-solid fa-circle" style="color: #1159d4"></i>
              <h2>좋음 0 ~ 15</h2>
              <i class="fa-solid fa-circle" style="color: #4cd411"></i>
              <h2>보통 16 ~ 35</h2>
            </div>
            <div class="right-box__dust__detailText2">
              <i class="fa-solid fa-circle" style="color: #f2eb07"></i>
              <h2>나쁨 36 ~ 75</h2>
              <i class="fa-solid fa-circle" style="color: #d42e11"></i>
              <h2>매우 나쁨 76 ~</h2>
            </div>
          </div>
        </div>
        <div class="right-box__bottom">
          <div class="right-box__bottom__location">
            <h2>{{ location }}</h2>
            <h1>{{ location_detail }}</h1>
          </div>
          <div class="right-box__bottom__weather">
            <i class="fa-solid fa-cloud"></i>
            <h1>{{ temp }}°C</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "moment/locale/ko";
import moment from "moment";

export default {
  data() {
    return {
      length: 2,
      onboarding: 0,
      location: "",
      location_detail: "",
      temp: "",
      humi: "",
      wind: "",
      rain: "",
      type: "",
      outfit: [],
    };
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 > this.length ? 1 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 <= 0 ? this.length : this.onboarding - 1;
    },
    dateFormat() {
      moment.lang("ko", {
        weekdays: [
          "일요일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "토요일",
        ],
      });
      return moment().format("YYYY MM DD dddd");
    },
  },
  async created() {
    const responseLocation = await axios.get("/api/location");
    const location = responseLocation.data.geoLocation;
    this.location = location.r1;
    this.location_detail = location.r3;

    const responseWeather = await axios.get("/api/weather");
    const weather = responseWeather.data.response.body.items;
    this.temp = weather.item[3].obsrValue;
    this.humi = weather.item[1].obsrValue;
    this.wind = weather.item[7].obsrValue;
    this.rain = weather.item[2].obsrValue;

    // console.log(weather);

    const preWeather = await axios.get("/api/preweather");
    const preWea = preWeather.data.response.body.items;
    const sky = preWea.item[4].fcstValue;
    // console.log(sky);

    if (sky == 1) {
      this.type = "맑음";
    } else if (sky == 3) {
      this.type = "구름많음";
    } else if (sky == 4) {
      this.type = "흐림";
    }

    // console.log(preWea);

    const chat = await axios.get("/api/chat");
    const ans = chat.data;
    this.outfit = ans.split("\n");
    console.log(this.outfit);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
* {
  font-family: "Montserrat", sans-serif;
}
</style>
