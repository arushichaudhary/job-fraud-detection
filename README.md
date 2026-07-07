# TrustSeal

An NLP-powered web application that analyzes job postings and flags potentially fraudulent listings in real time — built to help job seekers spot scams before they apply.

**Live Demo:** [job-fraud-detection-bxfa.onrender.com](https://job-fraud-detection-bxfa.onrender.com)

## Overview

Online job scams are a real and growing problem. Fake postings are used to harvest personal data, charge bogus "processing fees," or run phishing schemes. This project uses a machine learning model trained on approximately 18,000 labeled job postings to classify a listing as fraudulent or genuine, giving users an instant risk assessment before they engage with a job ad.

## Features

- Accepts a full job posting as input — title, location, department, description, requirements, benefits, employment type, experience, education, industry, and function
- Returns an instant classification verdict with an associated confidence score
- Displays a live confidence breakdown showing the probability split between genuine and fraudulent
- Includes preloaded sample postings (genuine and fraudulent) to test the classifier without manual data entry
- Provides a real-time input-completion tracker so users know how much detail is needed for an accurate prediction

## Tech Stack

| Layer | Tools |
|---|---|
| Backend | Python, Flask |
| Machine Learning | scikit-learn, TF-IDF / Count Vectorization |
| Frontend | HTML, Tailwind CSS, Vanilla JS |
| Deployment | Render |

## Model & Approach

Job posting text (title, description, requirements, benefits, etc.) is combined and transformed into numerical features using vectorization, then passed to a classifier trained to distinguish genuine postings from fraudulent ones. The model outputs a probability score via `predict_proba`, which is used to generate the confidence breakdown shown to the user.

Multiple classifiers were trained and benchmarked during development — Naive Bayes, Logistic Regression, LinearSVC, Decision Tree, and Random Forest — with the best-performing model selected for deployment. The exact algorithm and preprocessing pipeline used in production are documented in `model.py`.

## Dataset

Trained on the [EMSCAD — Real or Fake Job Postings dataset](https://www.kaggle.com/datasets/shivamb/real-or-fake-fake-jobposting-prediction) from Kaggle: approximately 18,000 labeled job listings with a binary `fraudulent` target column, covering real and fake postings across industries. Class imbalance was addressed via random under-sampling before training.

## Results

Evaluated on a class-balanced test split (30% holdout), averaged across multiple random seeds:

| Model | Accuracy | F1-Score | Precision | Recall |
|---|---|---|---|---|
| **Random Forest** (deployed) | **90.1%** | **90.1%** | 90.1% | 90.1% |
| Logistic Regression | 89.9% | 89.8% | 89.9% | 89.9% |
| LinearSVC | 88.9% | 88.8% | 89.0% | 88.9% |
| Naive Bayes | 88.7% | 88.7% | 88.7% | 88.7% |
| Decision Tree | 81.4% | 81.4% | 81.5% | 81.4% |

> Note: these figures reflect training on the under-sampled, class-balanced dataset. Performance on the raw, naturally imbalanced dataset (approximately 95% genuine / 5% fraudulent) may differ, particularly on recall for the fraudulent class.

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
# Clone the repo
git clone https://github.com/arushichaudhary/job-fraud-detection.git
cd job-fraud-detection

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the app
python app.py
```

Then open `http://localhost:5000` in your browser.

## Project Structure

```
job-fraud-detection/
├── app.py                              # Flask application
├── model.py                            # ML model loading and prediction logic
├── jupyter/
│   └── preprocess_and_train.ipynb      # Data preprocessing and model training
├── static/                             # CSS/JS assets
├── templates/                          # HTML templates
├── requirements.txt
└── README.md
```

## Future Improvements

- Add SHAP/LIME explainability to show why a posting was flagged
- Support bulk CSV upload for batch checking multiple postings
- Browser extension to check job postings directly on LinkedIn/Indeed
- Expand training data with more recent postings for better generalization

## Author

**Aarushi Chaudhary**
[Portfolio](#) · [GitHub](https://github.com/arushichaudhary)
