from flask import Flask, jsonify, make_response
import certifi
from pymongo import MongoClient
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient("mongodb+srv://charumishra5673:charu1234@nonogram.5yxeyxl.mongodb.net/?retryWrites=true&w=majority&appName=Nonogram")
db = client["Nonogram"]
collection = db["Puzzles"]

@app.route("/random_puzzle")
def get_random_puzzle():
    difficulty = request.args.get("difficulty")
    if not difficulty:
        return jsonify({"error": "Difficulty not specified"}), 400
    
    if difficulty == 'easy':
        difficultyVal = 1
    elif difficulty == 'medium':
        difficultyVal = 2
    else: difficultyVal = 3

    pipeline = [
        {"$match": {"difficulty": difficultyVal}},
        {"$sample": {"size": 1}},
        {"$project": {"_id": 0}}
    ]

    result = list(collection.aggregate(pipeline))
    if result:
        return jsonify(result[0])
    else:
        return jsonify({"error": "No puzzle found with that difficulty"}), 404

app.run(debug=True, use_reloader=False)