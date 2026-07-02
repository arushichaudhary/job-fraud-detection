# 🕵️ Job Fraud Detection

An NLP-powered web app that analyzes job postings and flags potentially fraudulent listings in real time — built to help job seekers spot scams before they apply.

**🔗 Live Demo:** [job-fraud-detection-bxfa.onrender.com](https://job-fraud-detection-bxfa.onrender.com/)

---

## 📌 Overview

Online job scams are a real and growing problem — fake postings are used to harvest personal data, charge bogus "processing fees," or run phishing schemes. This project uses a machine learning model trained on ~18,000 labeled job postings to classify a listing as **Genuine**, **Suspicious**, or **Fraudulent**, giving users an instant risk assessment before they engage with a job ad.

## ✨ Features

- 📝 Input a full job posting — title, location, department, description, requirements, benefits, employment type, experience, education, industry, and function
- ⚡ Instant **three-tier verdict**: Genuine (low risk) / Suspicious (medium risk) / Fraudulent (high risk)
- 📊 Live confidence breakdown showing the exact probability split between real and fake
- 🧪 Preloaded sample postings (genuine + suspicious) to test the classifier without typing everything manually
- 🎯 Real-time input completion tracker so users know how much detail is needed for an accurate prediction

## 🛠️ Tech Stack

| Layer | Tools |
|---|---|
| Backend | Python, Flask |
| Machine Learning | scikit-learn, TF-IDF Vectorizer |
| Frontend | HTML, Tailwind CSS, Vanilla JS |
| Deployment | Render |

## 🧠 Model & Approach

Job posting text (title, description, requirements, benefits, etc.) is combined and transformed into numerical features using **TF-IDF vectorization**, then passed to a probabilistic classifier trained to distinguish genuine postings from fraudulent ones. The model outputs a probability score via `predict_proba`, which is used to generate the three-tier risk verdict and confidence breakdown shown to the user.

> *Exact algorithm (Logistic Regression / Naive Bayes) documented in `model.py`.*

## 📂 Dataset

Trained on the **[EMSCAD — Real or Fake Job Postings](https://www.kaggle.com/datasets/shivamb/real-or-fake-fake-jobposting-prediction)** dataset from Kaggle: ~18,000 labeled job listings with a binary `fraudulent` target column, covering both real and fake postings across industries.

## 📈 Results

| Metric | Score |
|---|---|
| Accuracy | *TBD* |
| Precision | *TBD* |
| Recall | *TBD* |
| F1-Score | *TBD* |

*Fill in from `classification_report` / `accuracy_score` output in [`jupyter/preprocess_and_train.ipynb`](./jupyter/preprocess_and_train.ipynb).*

## 🚀 Getting Started

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

## 📁 Project Structure

```
job-fraud-detection/
├── app.py                              # Flask application
├── model.py                            # ML model loading & prediction logic
├── jupyter/
│   └── preprocess_and_train.ipynb      # Data preprocessing & model training
├── static/                             # CSS/JS assets
├── templates/                          # HTML templates
├── requirements.txt
└── README.md
```

## 🔮 Future Improvements

- [ ] Add SHAP/LIME explainability to show *why* a posting was flagged
- [ ] Support bulk CSV upload for batch checking multiple postings
- [ ] Browser extension to check job postings directly on LinkedIn/Indeed
- [ ] Expand training data with more recent postings for better generalization

## 👤 Author

**Aarushi Chaudhary**
[Portfolio](https://arushichaudhary.github.io/portfolio/) · [GitHub](https://github.com/arushichaudhary)

---

⭐ If you found this useful, consider giving it a star!
