import axios from "axios";

import { API_URL, API_ChatGPT_KEY } from "@env";

const serverGeneral = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    // Cookie:
    //   "Authorization=Authorization=eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoidmh0MTg3MjAwMkBnbWFpbC5jb20iLCJmdWxsTmFtZSI6IlZvIEhvYW5nIFRhbSIsImltZyI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0t1UHNJWTJ2SzNkaG1vSzVFcW45UDllSm0wQ3M5NHVuR0llMmZiVlM4QlFqQT1zOTYtYyIsInR5cGUiOiJpbnRlcm5hbCIsImlhdCI6MTY5NTg5Njc5MywiZXhwIjoxNjk2MTU1OTkzfQ.ty5gGD08rEagqKjjQwJWXaXgS38ukyZtOL9PE8agEj0BXkf-tD9RzHDhRJ07o-89; connect.sid=s%3AliZ1R4WgOg8EGOHCX4x9dKboLr6mL1Dx.LKveIQ%2FvELxLY9NxI05mJyZY1H5MfxbdDbPJenouprw",
  },
  withCredentials: true,
});
const serverFormData = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
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
  serverFormData,
};
