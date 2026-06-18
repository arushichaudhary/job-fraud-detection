import pandas as pd
import numpy as np
import pickle
from flask import Flask, render_template, request, jsonify, flash


app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
app.config['SECRET_KEY'] = "secret lol"

@app.route("/")
def Home():
    return render_template('index.html')

@app.route("/submit", methods=['POST'])
def submit():

    input_data = [
        request.form['title'] + ' ' +
        request.form['location'] + ' ' +
        request.form['department'] + ' ' +
        request.form['profile'] + ' ' +
        request.form['req'] + ' ' +
        request.form['ben'] + ' ' +
        request.form['emptype'] + ' ' +
        request.form['exp'] + ' ' +
        request.form['edu'] + ' ' +
        request.form['indu'] + ' ' +
        request.form['func'] + ' ' +
        request.form['des']
    ]

    # convert text to feature vectors
    input_data_features = vectorizer.transform(input_data)

    # 🔥 get probability instead of only prediction
    prob = model.predict_proba(input_data_features)[0]

    fake_prob = float(prob[1]) * 100
    real_prob = float(prob[0]) * 100

    # 🔥 risk logic
    if fake_prob > 70:
        result = "FRAUDULENT JOB 🚨"
        risk = "HIGH"
    elif fake_prob > 40:
        result = "SUSPICIOUS JOB ⚠️"
        risk = "MEDIUM"
    else:
        result = "GENUINE JOB ✅"
        risk = "LOW"

    return render_template(
        'index.html',
        result=result,
        fake_prob=round(fake_prob, 2),
        real_prob=round(real_prob, 2),
        risk=risk
    )
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)