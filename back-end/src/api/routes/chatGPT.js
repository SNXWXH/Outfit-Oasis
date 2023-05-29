import { communicateWithChatGPT } from "@/services/chatGPTService";

export default (router) => {
  router.post("/chat", async (req, res) => {
    const { message } = req.body;
    try {
      console.log("제발");
      const responses = await communicateWithChatGPT(message);
      res.json(responses);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};
