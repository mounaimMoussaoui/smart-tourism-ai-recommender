# TourGuide AI — Smart Tourism Recommendation Platform

TourGuide AI is an AI-powered tourism recommendation platform that suggests tourist places based on user preferences such as age, city, budget, nature interest, culture interest, adventure, shopping, and relaxation.

The project combines Machine Learning with a modern full-stack architecture using React, Express, FastAPI, and Scikit-learn.

## Features

* AI-based tourism recommendation system
* Preference-based recommendation mode
* Machine Learning model trained on tourism rating data
* Model comparison using MAE and RMSE
* React + TypeScript frontend
* Express.js backend API
* FastAPI AI microservice
* Modern animated UI
* Dark / light mode foundation
* Modular architecture ready for Google Maps integration

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Framer Motion
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* TypeScript
* Axios

### AI Service

* Python
* FastAPI
* Pandas
* Scikit-learn
* Joblib
* Uvicorn

## Machine Learning Workflow

1. Dataset collection
2. Data exploration
3. Data cleaning
4. Feature selection
5. Model training
6. Model evaluation
7. Model comparison
8. Best model selection
9. API integration
10. Frontend integration

## Models Tested

| Model             |   MAE |  RMSE |
| ----------------- | ----: | ----: |
| Gradient Boosting | 1.180 | 1.385 |
| KNN               | 1.276 | 1.508 |
| Random Forest     | 1.327 | 1.573 |
| Decision Tree     | 1.498 | 1.838 |

Gradient Boosting was selected because it achieved the lowest MAE and RMSE.

## Architecture

React Client
→ Express API
→ FastAPI AI Service
→ Trained Machine Learning Model
→ Recommendation Results

## Future Improvements

* Google Maps Places API integration
* Real Moroccan tourism dataset
* Place photos and map location
* Recommendation explanations
* User accounts
* Saved favorite places
* Search history
* SaaS version for tourism agencies
