import joblib
import pandas as pd

MODEL_PATH = "models/tourism_model.pkl"
CATEGORY_ENCODER_PATH = "models/category_encoder.pkl"
CITY_ENCODER_PATH = "models/city_encoder.pkl"
FEATURES_PATH = "models/features.pkl"
PLACES_PATH = "data/raw/tourism_with_id.csv"

model = joblib.load(MODEL_PATH)
category_encoder = joblib.load(CATEGORY_ENCODER_PATH)
city_encoder = joblib.load(CITY_ENCODER_PATH)
feature_columns = joblib.load(FEATURES_PATH)

places = pd.read_csv(PLACES_PATH)
places = places.drop(columns=["Unnamed: 11", "Unnamed: 12", "Coordinate"], errors="ignore")

places["Time_Minutes"] = places["Time_Minutes"].fillna(places["Time_Minutes"].median())