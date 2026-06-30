
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

export type PreferenceRecommendationRequest = {
  age: number;
  city: string;
  budget: string;
  nature: number;
  culture: number;
  adventure: number;
  shopping: number;
  relaxation: number;
  top_n: number;
};

export async function getPreferenceRecommendations(
  data: PreferenceRecommendationRequest
) {
  const response = await axios.post(
    `${API_URL}/recommendations/preferences`,
    data
  );

  return response.data;
}