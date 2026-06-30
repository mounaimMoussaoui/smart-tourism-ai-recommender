from pydantic import BaseModel

class RecommendationRequest(BaseModel):
    age: int
    category: str
    city: str
    top_n: int = 5


class PreferenceRecommendationRequest(BaseModel):
    age: int
    city: str
    budget: str
    nature: int
    culture: int
    adventure: int
    shopping: int
    relaxation: int
    top_n: int = 5