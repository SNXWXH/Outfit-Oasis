import config from "@/config";
import { Configuration, OpenAIApi } from "openai";

export async function communicateWithChatGPT(message) {
  try {
    const configuration = new Configuration({
      apiKey: config.ai_key,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "당신은 지금부터 날씨의 정보를 얻게 되면 이에 맞는 옷을 5가지 추천해 줄 수 있습니다.",
        },
        {
          role: "user",
          content:
            "하늘 상태는 맑다. 1시간 강수량은 1mm이다. 온도가 18.2도이다. 이런 날씨의 옷 추천해줘",
        },
        {
          role: "assistant",
          content: `• 방수 가능한 가벼운 자켓 또는 우비
          • 가벼운 슬랙스 또는 청바지
          • 가벼운 스카프나 모자
          • 따뜻한 내의류
          • 필요시 가벼운 재킷이나 셔츠`,
        },
        {
          role: "user",
          content: `${message}`,
        },
      ],
      temperature: 1.0,
    });

    const choices = response.data.choices[0].message.content;
    // console.log(choices);
    return choices;
  } catch (error) {
    console.error("ChatGPT와 통신 중 오류 발생:", error.response);
    throw error;
  }
}

async function main() {
  const message =
    "하늘의 상태는 맑고, 1시간 강수량은 0mm이며, 온도가 32도인 날씨의 옷 추천해줘";
  try {
    const responses = await communicateWithChatGPT(message);
    console.log("ChatGPT 응답:", responses);
  } catch (error) {
    console.error("오류:", error);
  }
}

// main();
