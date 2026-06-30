
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type RecommendationRequest = {
  age: number;
  category: string;
  city: string;
  top_n: number;
};

export async function getRecommendations(data: RecommendationRequest) {
  const response = await axios.post(`${API_URL}/recommendations`, data);
  return response.data;
}

export async function getRecommendationMetadata() {
  const response = await axios.get(`${API_URL}/recommendations/metadata`);
  return response.data;
}