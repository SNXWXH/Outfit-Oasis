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
                <h2>• 방수 가능한 가벼운 자켓 또는 우비</h2>
                <h2>• 방수 가능한 가벼운 자켓 또는 우비</h2>
                <h2>• 방수 가능한 가벼운 자켓 또는 우비</h2>
                <h2>• 방수 가능한 가벼운 자켓 또는 우비</h2>
                <h2>• 방수 가능한 가벼운 자켓 또는 우비</h2>
              </div>
            </v-card>
          </v-window-item>
          <v-window-item :key="`card-${n}`">
            <v-card elevation="2" class="detail__v-card">
              <h1>Weather Detail</h1>
              <div class="detail__v-card-weather">
                <div class="detail__v-card-temp">
                  <h2>Max/Min Temp</h2>
                  <h2>3°C / 18°C</h2>
                </div>
                <div class="detail__v-card-humidity">
                  <h2>Humidity</h2>
                  <h2>60%</h2>
                </div>
                <div class="detail__v-card-wind">
                  <h2>Wind</h2>
                  <h2>734km/h</h2>
                </div>
                <div class="detail__v-card-cloud">
                  <h2>Cloudy</h2>
                  <h2>80%</h2>
                </div>
              </div>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
      <div class="right-box">
        <div class="right-box__day">
          <h2>2023 May 01 Monday</h2>
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
            <h2>Korea</h2>
            <h1>Seoul</h1>
          </div>
          <div class="right-box__bottom__weather">
            <i class="fa-solid fa-cloud"></i>
            <h1>14°C</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    length: 2,
    onboarding: 0,
  }),
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 > this.length ? 1 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 <= 0 ? this.length : this.onboarding - 1;
    },
  },
};
</script>

<style></style>
