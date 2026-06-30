from app.model_loader import model, category_encoder, city_encoder, feature_columns, places

def recommend_places(age: int, category: str, city: str, top_n: int = 5):
    candidates = places.copy()

    category_encoded = category_encoder.transform([category])[0]
    city_encoded = city_encoder.transform([city])[0]

    candidates["Age"] = age
    candidates["Category"] = category_encoded
    candidates["City"] = city_encoded

    x_candidates = candidates[feature_columns]

    candidates["Predicted_Rating"] = model.predict(x_candidates)

    recommendations = (
        candidates.sort_values("Predicted_Rating", ascending=False)
        .head(top_n)
    )

    return recommendations[
        ["Place_Id", "Place_Name", "Category", "City", "Price", "Rating", "Predicted_Rating"]
    ].to_dict(orient="records")



def map_preferences_to_category(preferences):
    scores = {
        "Cagar Alam": preferences.nature + preferences.relaxation,
        "Budaya": preferences.culture,
        "Taman Hiburan": preferences.adventure,
        "Pusat Perbelanjaan": preferences.shopping,
        "Bahari": preferences.relaxation + preferences.nature,
    }

    return max(scores, key=scores.get)


def recommend_by_preferences(preferences):
    predicted_category = map_preferences_to_category(preferences)

    return recommend_places(
        age=preferences.age,
        category=predicted_category,
        city=preferences.city,
        top_n=preferences.top_n
    )