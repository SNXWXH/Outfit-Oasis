## 서버 실행

```sql
#프론트 실행
yarn dev

#백엔드 실행
yarn dev
```

## 핵심주제

- 사용자들이 일상생활에서 자주 사용할 수 있는 서비스
- 사용자의 위치 변화에 따른 실시간 날씨 정보 제공
- 날씨 정보와 기온에 따라, 사용자에게 적합한 옷차림 추천
- 위치에 따른 미세먼지 정보 제공
- 사용자들이 쉽게 날씨를 파악할 수 있도록 시각적인 요소 제공

## 기능

### Geolocation API 핵심 코드

<img width="433" alt="location" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/e7b21807-5647-4942-b772-021f6c611d07">


- 현재 위치의 ip값을 넘겨주기 위해 ipGeoService 사용
- ip 값을 geolacation 파라미터에 넣기
- API  값 넘겨 받아서 list.b에 저장하여 return
- 해당 라우터는 /location으로 설정

### 날씨 API 연동 핵심 코드

<img width="554" alt="weather" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/a7254f59-5aba-4339-8fed-d4f976f2021a">


- 위도와 경도 값을 받아오기 위해 /location에서 lat값과 lng 값 넘겨받기
- 넘겨받은 위경도 값을 격자 값으로 전환하여 파라미터 넘기기
- 해당 API는 30분 마다 기상 정보가 초기화 되므로 현재 시간에서 30분 뺀 값을 파라미터로 넘기기

### chatGPT 연동 및 학습 핵심 코드

<img width="540" alt="chat" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/f8c88ede-e098-4570-a9b4-cf51b8f1bddb">


- chatGPT에게 어떠한 역할을 해야하는지 학습
- 사용자가 어떠한 content을 주는지 학습
- 그에 따라 해당 날씨에 맞는 옷차림 주는 content 학습

<img width="855" alt="router" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/ac5648b3-e1b4-46d4-b32e-861340876f2e">


- 라우터 부분에서 날씨 API를 불러온 후, 하늘 상태, 강수량, 현재 온도를 메세지로 넘기기

### 배경과 아이콘 설정

<img width="516" alt="icon" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/71894638-067c-4505-b02f-731d4432cc4c">


- 날씨에서 받아온 하늘의 값으로 배경과 아이콘 변수에 따라 다르게 보이기

## 화면 설명

### 옷차림 제공 화면

![outfit](https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/31a5376e-d3a5-4bbd-93a9-d23c9eb0b957)


1. moment.js를 활용하여 오늘의 날짜와 요일 제공
2. 네이버의 Geoloacation API를 활용하여 현재 위치 값을 받아오기
3. 기상청 단기예보 API를 활용하여 현재의 날씨 온도 표시
4. vuetify의 슬라이드와 chatGPT를 활용한 현재 날씨에 맞는 옷차림 제공

<img width= "49%" alt="back1" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/36bcb560-99e0-4b32-8876-64390b78b747">

<img width= "49%" alt="back2" src="https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/abd919bd-cf20-4878-9039-dd87bd53f4df">


5. 현재 날씨에 맞는 배경 gif와 날씨 아이콘 제공

### 날씨 상세정보 제공 화면

![weatherDetail](https://github.com/SNXWXH/Outfit-Oasis/assets/103805620/dcf9744e-0f9a-4019-95e0-1053eb6a255a)

1. vuetify의 슬라이드와 기상청 단기예보 API를 활용하여 현재 하늘의 상태, 습도, 풍속, 1시간 강수량 정보 제공
2. openweathermap의 미세먼지 API를 활용하여 현재 위치의 미세먼지 농도 제공
3. 물음표 아이콘에 호버 시, 미세먼지 농도 기준 제공
