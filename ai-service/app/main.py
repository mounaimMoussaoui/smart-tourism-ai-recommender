# from fastapi import FastAPI

# app = FastAPI(title="TourGuide AI Service")

# @app.get("/")
# def health_check():
#     return {
#         "status": "ok",
#         "message": "TourGuide AI Service is running"
#     }



from fastapi import FastAPI
from app.schemas import RecommendationRequest, PreferenceRecommendationRequest
from app.recommender import recommend_places, recommend_by_preferences
from app.model_loader import places

app = FastAPI(title="TourGuide AI Service")

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "TourGuide AI Service is running"
    }

@app.post("/recommend")
def recommend(request: RecommendationRequest):
    results = recommend_places(
        age=request.age,
        category=request.category,
        city=request.city,
        top_n=request.top_n
    )

    return {
        "input": request,
        "recommendations": results
    }

@app.get("/metadata")
def get_metadata():
    return {
        "categories": sorted(places["Category"].dropna().unique().tolist()),
        "cities": sorted(places["City"].dropna().unique().tolist())
    }


@app.post("/recommend/preferences")
def recommend_preferences(request: PreferenceRecommendationRequest):
    results = recommend_by_preferences(request)

    return {
        "input": request,
        "recommendations": results
    }