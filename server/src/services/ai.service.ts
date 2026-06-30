import axios from "axios";

const AI_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

export async function getRecommendations(data: any) {
  console.log("Data sent to AI:", data);

  const response = await axios.post(`${AI_URL}/recommend`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
}


export async function getMetadata() {
  const response = await axios.get(`${AI_URL}/metadata`);
  return response.data;
}