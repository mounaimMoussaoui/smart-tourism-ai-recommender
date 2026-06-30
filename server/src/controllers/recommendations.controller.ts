import {
  getRecommendations,
  getMetadata,
  getPreferenceRecommendations,
} from "../services/ai.service.js";

export async function recommendByPreferences(req: Request, res: Response) {
  try {
    const recommendations = await getPreferenceRecommendations(req.body);
    return res.json(recommendations);
  } catch (error: any) {
    return res.status(500).json({
      message: "Preference recommendation failed",
      error: error.response?.data || error.message,
    });
  }
}

export async function recommend(req: Request, res: Response) {
  try {
    console.log("Body received by Express:", req.body);

    const recommendations = await getRecommendations(req.body);

    return res.json(recommendations);
  } catch (error: any) {
    console.error("Recommendation error:", error.response?.data || error.message);

    return res.status(500).json({
      message: "Recommendation failed",
      error: error.response?.data || error.message,
    });
  }
}

export async function metadata(req: Request, res: Response) {
  try {
    const data = await getMetadata();
    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: "Metadata failed",
      error: error.response?.data || error.message,
    });
  }
}