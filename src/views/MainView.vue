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
export default {};
</script>

<style></style>
