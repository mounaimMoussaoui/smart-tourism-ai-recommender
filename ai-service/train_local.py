import pandas as pd
import joblib
import os
import sklearn

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import GradientBoostingRegressor

print("Sklearn version:", sklearn.__version__)

places = pd.read_csv("data/raw/tourism_with_id.csv")
ratings = pd.read_csv("data/raw/tourism_rating.csv")
users = pd.read_csv("data/raw/user.csv")

places = places.drop(columns=["Unnamed: 11", "Unnamed: 12", "Coordinate"], errors="ignore")
places["Time_Minutes"] = places["Time_Minutes"].fillna(places["Time_Minutes"].median())

ratings = ratings.drop_duplicates()
users = users.drop_duplicates()
places = places.drop_duplicates()

data = ratings.merge(places, on="Place_Id", how="left")
data = data.merge(users, on="User_Id", how="left")

X = data[["Age", "Category", "City", "Price", "Rating", "Time_Minutes"]].copy()
y = data["Place_Ratings"]

category_encoder = LabelEncoder()
city_encoder = LabelEncoder()

X["Category"] = category_encoder.fit_transform(X["Category"])
X["City"] = city_encoder.fit_transform(X["City"])

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = GradientBoostingRegressor(random_state=42)
model.fit(X_train, y_train)

os.makedirs("models", exist_ok=True)

feature_columns = ["Age", "Category", "City", "Price", "Rating", "Time_Minutes"]

joblib.dump(model, "models/tourism_model.pkl")
joblib.dump(category_encoder, "models/category_encoder.pkl")
joblib.dump(city_encoder, "models/city_encoder.pkl")
joblib.dump(feature_columns, "models/features.pkl")

print("✅ Local model trained and saved successfully.")