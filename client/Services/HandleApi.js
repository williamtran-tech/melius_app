import axios from "axios";

import { API_URL, API_ChatGPT_KEY } from "@env";

const serverGeneral = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});
const generateResponse = async (input) => {
  console.log(input);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content:
              "You are a helpful Ai doctor. do not answer any question that not relate to your major.",
          },
          {
            role: "user",
            content: input,
          },
        ],
        model: "gpt-3.5-turbo",
      },
      {
        headers: {
          Authorization: `Bearer ${API_ChatGPT_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(err, "api call error");
  }
};
export default {
  serverGeneral,
  generateResponse,
};
